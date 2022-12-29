// Import du routeur de Express
const router = require("express").Router();

// Import du contrôleur d'authentification
const authController = require("../controllers/auth.controller");

// Association de la route POST "/register" avec la méthode "register" du contrôleur d'authentification
router.post("/register", authController.register);

// Association de la route POST "/login" avec la méthode "login" du contrôleur d'authentification
router.post("/login", authController.login);

// Export du routeur
module.exports = router;