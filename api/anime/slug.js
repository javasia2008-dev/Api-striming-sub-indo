const scrapeAnimeDetail = require("../../lib/scrapers/animeDetail");

module.exports = async (req, res) => {
  try {
    const { slug } = req.query;
    const data = await scrapeAnimeDetail(slug);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};