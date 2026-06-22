const cheerio = require("cheerio");
const { fetchHTML } = require("../utils");

const scrapeLatest = async () => {
  const html = await fetchHTML("https://v2.samehadaku.how/anime-terbaru/");
  const $ = cheerio.load(html);
  const results = [];

  $(".post-show ul li").each((i, el) => {
    const $el = $(el);
    results.push({
      title: $el.find("h2.entry-title a").text().trim(),
      url: $el.find("h2.entry-title a").attr("href"),
      episode: $el.find("author").first().text().trim(),
      author: $el.find(".author vcard author").text().trim(),
      time: $el.find("span:contains('Released on')").text().replace("Released on:", "").trim(),
      image: $el.find("img.npws").attr("src"),
    });
  });

  return results;
};

module.exports = scrapeLatest;