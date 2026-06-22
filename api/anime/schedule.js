const scrapeSchedule = require("../../lib/scrapers/schedule");

module.exports = async (req, res) => {
  try {
    const { day } = req.query;
    if (!day) return res.status(400).json({ error: "day parameter required" });
    const data = await scrapeSchedule(day);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};