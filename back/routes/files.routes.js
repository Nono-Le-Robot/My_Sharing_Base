// Import du routeur de Express
const router = require("express").Router();

// Import du contrôleur de fichiers
const filesController = require("../controllers/files.controller.js");

// Association de la route POST "/upload" avec la méthode "upload" du contrôleur de fichiers
router.post("/upload", filesController.upload);

// Association de la route POST "/add-files" avec la méthode "add" du contrôleur de fichiers
router.post("/add-files", filesController.add);

// Association de la route POST "/my-files" avec la méthode "getFiles" du contrôleur de fichiers
router.post("/my-files", filesController.getFiles);

// Association de la route POST "/remove-files" avec la méthode "removeFiles" du contrôleur de fichiers
router.post("/remove-files", filesController.removeFiles);

// Export du routeur
module.exports = router;