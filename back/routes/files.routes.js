const router = require("express").Router();
const filesController = require("../controllers/files.controller.js");

router.post("/upload", filesController.upload);
router.post("/add", filesController.add);
router.post("/my-files", filesController.getFiles);
router.delete("/remove-file", filesController.removeFile);

module.exports = router;
