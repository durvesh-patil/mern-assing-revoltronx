const express = require("express");
const axios = require("axios");
const router = express.Router();

const SERP_API_KEY = process.env.SERP_API_KEY; // Get your API key from SerpAPI

router.get("/scholar", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(`https://serpapi.com/search.json`, {
      params: {
        engine: "google_scholar",
        q: query,
        api_key: SERP_API_KEY,
      },
    });

    const results = response.data.organic_results.map((item) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch academic papers" });
  }
});

module.exports = router;
