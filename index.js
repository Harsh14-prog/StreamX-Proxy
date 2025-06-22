const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjg3MjYyYzhkNjk5ODBhYjI4MzJiM2UxZDYzNmNjZSIsIm5iZiI6MTczNjkwODU5NS44MSwic3ViIjoiNjc4NzFmMzNmZTI5NGEwYjQ3NGU5MTNmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.g5ZUSy8YWLlDr_ksfEXZdA26IYHLGeXxJIvFXVLWurU";

app.get(/^\/api\/(.*)/, async (req, res) => {
  try {
    // Get the matched part after /api/
    const tmdbPath = req.params[0];

    const queryString = new URLSearchParams(req.query).toString();

    const url = `https://api.themoviedb.org/3/${tmdbPath}${queryString ? '?' + queryString : ''}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("TMDb Proxy Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: "Failed to fetch data from TMDb" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
