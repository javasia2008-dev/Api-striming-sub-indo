const cheerio = require("cheerio");
const { fetchHTML } = require("../utils");

const scrapeBatch = async (page = 1) => {
  const url = `https://v2.samehadaku.how/daftar-batch/page/${page}/`;
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);
  const results = [];

  $(".relat .animpost").each((i, el) => {
    const $el = $(el);
    results.push({
      title: $el.find(".data .title h2").text().trim(),
      url: $el.find(".animposx a").attr("href"),
      image: $el.find(".anmsa").attr("src"),
      score: $el.find(".score").text().trim(),
      type: $el.find(".type.TV").text().trim(),
      status: $el.find(".data .type").last().text().trim(),
      genres: $el.find(".genres .mta a").map((i, a) => $(a).text().trim()).get(),
    });
  });

  return results;
};

module.exports = scrapeBatch;