const scrapeList = require("../../lib/scrapers/list");

module.exports = async (req, res) => {
  try {
    const data = await scrapeList(req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};