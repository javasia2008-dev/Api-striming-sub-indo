const scrapeLatest = require("../../lib/scrapers/latest");

module.exports = async (req, res) => {
  try {
    const data = await scrapeLatest();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};