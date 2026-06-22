const axios = require("axios");

const scrapeSchedule = async (day) => {
  const { data } = await axios.get(
    `https://v2.samehadaku.how/wp-json/custom/v1/all-schedule?day=${day}&perpage=20`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  // data adalah array object anime
  return data.map(item => ({
    title: item.title,
    url: item.url,
    image: item.featured_img_src,
    score: item.east_score,
    type: item.east_type,
    genres: item.genre, // string dipisah koma
    time: item.east_time,
  }));
};

module.exports = scrapeSchedule;