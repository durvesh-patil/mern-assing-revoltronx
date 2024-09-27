const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const youtubeRoutes = require("./routes/youtube");
const googleSearchRoutes = require("./routes/googleSearch");
const googleScholarRoutes = require("./routes/googleScholar");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/youtube", youtubeRoutes);
app.use("/search", googleSearchRoutes);
app.use("/scholar", googleScholarRoutes);

app.get("/", (req, res) => {
  res.send("Internet Search API is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
