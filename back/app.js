// Import du fichier de configuration de la base de données
require("./config/db.js");

// Import du middleware body-parser
const bodyParser = require("body-parser");

// Import du framework Express
const express = require("express");

// Import des routes de l'authentification
const authRoutes = require("./routes/auth.routes");

// Import des routes pour les fichiers
const filesRoutes = require("./routes/files.routes");

// Import des routes pour les dossiers
const foldersRoutes = require("./routes/folders.routes");

// Création de l'application Express
const app = express();

// Import du middleware CORS (Cross-Origin Resource Sharing)
const cors = require("cors");

// Utilisation du middleware CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Utilisation du middleware body-parser pour traiter les données envoyées dans les requêtes HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "1000mb" }));

// Association des routes de l'authentification avec l'URL "/portfolio/my-sharing-base/api/auth"
app.use("/portfolio/my-sharing-base/api/auth", authRoutes);

// Association des routes pour les fichiers avec l'URL "/portfolio/my-sharing-base/"
app.use("/portfolio/my-sharing-base/", filesRoutes);

// Association de la gestion de fichiers statiques avec l'URL "/portfolio/my-sharing-base/files"
app.use("/portfolio/my-sharing-base/files", express.static("files"));

// Association des routes de l'authentification avec l'URL "/api/auth"
app.use("/api/auth", authRoutes);

// Association des routes pour les fichiers avec l'URL "/"
app.use("/", filesRoutes);

// Association de la gestion de fichiers statiques avec l'URL "/files"
app.use("/files", express.static("files"));

// Association des routes pour les dossiers avec l'URL "/folder"
app.use("/folder", foldersRoutes);

// Démarrage de l'application sur le port défini dans l'environnement (process.env.PORT)
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});