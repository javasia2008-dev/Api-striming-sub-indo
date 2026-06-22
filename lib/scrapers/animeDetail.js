const cheerio = require("cheerio");
const { fetchHTML } = require("../utils");

const scrapeAnimeDetail = async (slug) => {
  const url = `https://v2.samehadaku.how/anime/${slug}/`;
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);

  // Info utama
  const title = $("h1.entry-title").text().trim();
  const description = $(".entry-content-single").first().text().trim();
  const image = $(".infoanime .thumb img").attr("src");
  const score = $(".rating-area .rtg span:first").text().trim();

  const detail = {};
  $(".spe span").each((i, el) => {
    const text = $(el).text().trim();
    const split = text.split(/\s{2,}/);
    if (split.length === 2) {
      detail[split[0].toLowerCase().replace(/\s/g, "_")] = split[1];
    }
  });

  const genres = [];
  $(".genre-info a").each((i, el) => genres.push($(el).text().trim()));

  // Daftar episode
  const episodes = [];
  $(".lstepsiode.listeps ul li").each((i, el) => {
    const $el = $(el);
    episodes.push({
      episode: $el.find(".eps a").text().trim(),
      title: $el.find(".epsleft .lchx a").text().trim(),
      url: $el.find(".eps a").attr("href"),
      date: $el.find(".date").text().trim(),
    });
  });

  return {
    title,
    description,
    image,
    score,
    genres,
    detail,
    episodes,
  };
};

module.exports = scrapeAnimeDetail;