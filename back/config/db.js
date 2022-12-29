// On commence par importer Mongoose et le module de configuration dotenv
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

// On se connecte à la base de données MongoDB en utilisant l'URL de connexion fournie
// et en spécifiant qu'on utilise les nouveaux parseurs d'URL et la topologie unifiée
mongoose.connect(
  `mongodb+srv://${process.env.IDMDB}@cluster0.ep4znvs.mongodb.net/my-sharing-base`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  // Si la connexion réussit, on affiche un message de succès
  .then(() => console.log("Connexion à MongoDB réussie !"))
  // Si la connexion échoue, on affiche un message d'erreur avec le message d'erreur fourni
  .catch((err) => console.log("Connexion à MongoDB échouée ! : " + err));
