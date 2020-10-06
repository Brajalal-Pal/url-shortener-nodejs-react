const express = require("express");
const shortURLController = require("../controllers/shortUrl-controller");
const router = express.Router();

router.post("/", shortURLController.postShortURL);
router.get("/stats", shortURLController.getUrls);
router.get("/:short", shortURLController.getAccessByShortURL);

module.exports = router;
