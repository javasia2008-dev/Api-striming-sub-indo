const cheerio = require("cheerio");
const { fetchHTML } = require("../utils");

const scrapeList = async (params) => {
  const base = "https://v2.samehadaku.how/daftar-anime-2/";
  const query = new URLSearchParams(params).toString();
  const url = query ? `${base}?${query}` : base;
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
      type: $el.find(".type.TV, .type.Movie, .type.OVA").text().trim(),
      status: $el.find(".data .type").last().text().trim(),
      genres: $el.find(".genres .mta a").map((i, a) => $(a).text().trim()).get(),
    });
  });

  const pagination = {};
  $(".pagination span.page-numbers.current").each((i, el) => {
    pagination.current = $(el).text().trim();
  });
  $(".pagination a.inactive:last").each((i, el) => {
    pagination.last = $(el).text().trim();
  });

  return { results, pagination };
};

module.exports = scrapeList;