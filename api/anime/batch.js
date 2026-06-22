const scrapeBatch = require("../../lib/scrapers/batch");

module.exports = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await scrapeBatch(page);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};