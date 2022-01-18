const express = require("express");
const cors = require("cors");
const axios = require("axios");
const url = require("url");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// initialize express
const app = express();

// enable CORS
app.use(cors());

// routes
app.get("/api/search/:query", async (req, res) => {
  try {
    // add api key & query strings
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      ...url.parse(req.url, true).query,
    });
    console.log(params);
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );
    const data = results.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
