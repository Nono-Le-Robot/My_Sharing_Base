// Import de Mongoose, un framework pour modéliser les données en MongoDB
const mongoose = require("mongoose");

// Création du schéma de données de l'utilisateur
const userSchema = new mongoose.Schema({
  // Le nom d'utilisateur est une chaîne de caractères requise et unique, de longueur minimale de 3 et maximale de 20
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  // L'adresse email est une chaîne de caractères requise et unique, de longueur maximale de 60
  email: {
    type: String,
    required: true,
    unique: true,
    max: 60,
  },
  // Le mot de passe est une chaîne de caractères requise, de longueur minimale de 8
  password: {
    type: String,
    required: true,
    min: 8,
  },
  // Indique si l'avatar de l'utilisateur a été défini ou non (par défaut, non)
  avatarIsSet: {
    type: Boolean,
    default: false,
  },
  // Le lien vers l'avatar de l'utilisateur (par défaut, une chaîne vide)
  avatarLink: {
    type: String,
    default: "",
  },
  // La liste des fichiers de l'utilisateur (par défaut, un tableau vide)
  files: {
    type: Array,
    default: [],
  },
});

// Export du modèle de données de l'utilisateur, basé sur le schéma défini ci-dessus
module.exports = mongoose.model("User", userSchema);
