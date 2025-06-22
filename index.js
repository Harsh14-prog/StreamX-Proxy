const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// ✅ Replace with your real TMDb token
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjg3MjYyYzhkNjk5ODBhYjI4MzJiM2UxZDYzNmNjZSIsIm5iZiI6MTczNjkwODU5NS44MSwic3ViIjoiNjc4NzFmMzNmZTI5NGEwYjQ3NGU5MTNmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.g5ZUSy8YWLlDr_ksfEXZdA26IYHLGeXxJIvFXVLWurU";

app.get("/api/trending", async (req, res) => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/trending/all/day", {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.log("TMDb Error:", error.response?.data || error.message); // ✅ Add this line
    res.status(500).json({ error: "Failed to fetch data from TMDb" });
  }
});


app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
