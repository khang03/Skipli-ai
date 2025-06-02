const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/ServiceController");

router.post("/sendcode", serviceController.sendCode);
// router.post("/", serviceController.);
router.post("/savepost", serviceController.saveGeneratedContent);
router.get("/getuserpost", serviceController.getUserGeneratedContents);
router.delete("/unsavecontent", serviceController.UnSaveContent);
module.exports = router;
