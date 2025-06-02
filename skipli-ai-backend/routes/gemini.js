const express = require("express");
const router = express.Router();
const gemeniController = require("../controllers/geminiController");

router.post("/", gemeniController.getPromptResponse);

module.exports = router;
