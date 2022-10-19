const router = require("express").Router();
const filesController = require("../controllers/files.controller.js");

router.post("/upload", filesController.upload);

module.exports = router;
