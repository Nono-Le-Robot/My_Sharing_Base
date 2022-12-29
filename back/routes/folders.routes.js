// Import du routeur de Express
const router = require("express").Router();

// Import du contrôleur de dossiers
const foldersController = require("../controllers/folders.controller.js");

// Association de la route POST "/create-folder" avec la méthode "createFolder" du contrôleur de dossiers
router.post("/create-folder", foldersController.createFolder);

// Export du routeur
module.exports = router;