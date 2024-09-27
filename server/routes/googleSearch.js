const express = require("express");
const axios = require("axios");
const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          key: GOOGLE_API_KEY,
          cx: SEARCH_ENGINE_ID,
          q: query,
          num: 10,
        },
      }
    );

    const results = response.data.items.map((item) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles/blogs" });
  }
});

module.exports = router;
