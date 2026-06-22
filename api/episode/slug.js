const scrapeEpisode = require("../../lib/scrapers/episodeDetail");

module.exports = async (req, res) => {
  try {
    const { slug } = req.query;
    const data = await scrapeEpisode(slug);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};