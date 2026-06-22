const cheerio = require("cheerio");
const { fetchHTML } = require("../utils");

const scrapeEpisode = async (slug) => {
  const url = `https://v2.samehadaku.how/${slug}/`;
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);

  const title = $("h1.entry-title").text().trim();
  const description = $(".entry-content-single").first().text().trim();
  const episodeNumber = $(".sbdbti .epx span[itemprop='episodeNumber']").text().trim();

  // Download links (berdasarkan format)
  const downloads = {};
  $(".download-eps").each((i, block) => {
    const format = $(block).find("p b").text().trim();
    const links = [];
    $(block).find("li").each((j, li) => {
      const quality = $(li).find("strong").text().trim();
      const services = [];
      $(li).find("span a").each((k, a) => {
        services.push({
          name: $(a).text().trim(),
          url: $(a).attr("href"),
        });
      });
      links.push({ quality, services });
    });
    downloads[format] = links;
  });

  // Daftar server streaming (dari tombol pilihan server)
  const servers = [];
  $("#server ul li").each((i, el) => {
    const $el = $(el).find(".east_player_option span");
    servers.push($el.text().trim());
  });

  return {
    title,
    description,
    episode: episodeNumber,
    servers,
    downloads,
  };
};

module.exports = scrapeEpisode;