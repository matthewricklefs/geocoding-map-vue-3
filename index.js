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
app.use("/api/search", require("./routes/searchResults.js"));

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
