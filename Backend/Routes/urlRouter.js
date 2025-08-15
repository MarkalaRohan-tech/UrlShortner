const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectURL,
  handleURLAnalytics
} = require("../Controllers/urlController");

const router = express.Router();

router.post("/", handleGenerateNewShortURL)

router.get("/analytics", handleURLAnalytics);

router.get("/:id", handleRedirectURL);

module.exports = router;