const express = require("express");
const router = express.Router();
const axios = require("axios");
const url = require("url");

router.get("/:query", async (req, res) => {
  try {
    // add api key & query strings
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      ...url.parse(req.url, true).query,
    });
    // fetching from geocoding search API
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );

    // formatting data to target city and state
    const data = results.data;
    data.features.forEach((item) => {
      // initially set to null
      item.city = null;
      item.state = null;

      // cycle through content results
      item.context.forEach((type) => {
        if (type.id.includes("price")) {
          item.city = type.text;
        }
        if (type.id.includes("region")) {
          item.state = type.text;
        }
      });
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
