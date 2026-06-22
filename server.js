const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Import handlers
const latest    = require("./api/anime/latest");
const list      = require("./api/anime/list");
const schedule  = require("./api/anime/schedule");
const batch     = require("./api/anime/batch");
const animeSlug = require("./api/anime/slug");
const episodeSlug = require("./api/episode/slug");

// ─── Routes ──────────────────────────────────────────────────────────────────

// GET /api/anime/latest
app.get("/api/anime/latest", latest);

// GET /api/anime/list?page=1&status=ongoing&genre=action
app.get("/api/anime/list", list);

// GET /api/anime/schedule?day=senin
app.get("/api/anime/schedule", schedule);

// GET /api/anime/batch?page=1
app.get("/api/anime/batch", batch);

// GET /api/anime/:slug  → misal /api/anime/naruto-shippuden
app.get("/api/anime/:slug", (req, res) => {
  req.query.slug = req.params.slug;
  return animeSlug(req, res);
});

// GET /api/episode/:slug  → misal /api/episode/naruto-shippuden-episode-1
app.get("/api/episode/:slug", (req, res) => {
  req.query.slug = req.params.slug;
  return episodeSlug(req, res);
});

// Root
app.get("/", (req, res) => {
  res.json({
    name: "Samehadaku API",
    version: "1.0.0",
    endpoints: {
      latest:   "GET /api/anime/latest",
      list:     "GET /api/anime/list?page=1&status=ongoing&genre=action",
      schedule: "GET /api/anime/schedule?day=senin",
      batch:    "GET /api/anime/batch?page=1",
      anime:    "GET /api/anime/:slug",
      episode:  "GET /api/episode/:slug",
    },
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint tidak ditemukan" });
});

app.listen(PORT, () => {
  console.log(`Samehadaku API berjalan di port ${PORT}`);
});

module.exports = app;
