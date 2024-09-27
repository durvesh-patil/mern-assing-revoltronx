const express = require("express");
const axios = require("axios");
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: query,
          key: YOUTUBE_API_KEY,
          maxResults: 10,
          order: "viewCount",
        },
      }
    );

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      videoId: item.id.videoId,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch YouTube videos",
    });
  }
});

module.exports = router;
