// On importe le modèle de l'utilisateur et la bibliothèque bcrypt
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// On définit la fonction register qui sera exportée 
module.exports.register = async (req, res) => {
  // On récupère les données de la requête (username, email et password)
  const { username, email, password } = req.body;

  // On vérifie si l'username ou l'email existent déjà en base de données
  const checkUser = await userModel.findOne({ username });
  const checkEmail = await userModel.findOne({ email });

  // Si l'username existe déjà, on renvoie un message d'erreur
  if (checkUser) {
    return res.json({ msg: "Username already used", status: false });
  }

  // Si l'email existe déjà, on renvoie un message d'erreur
  if (checkEmail) {
    return res.json({ msg: "Email already used", status: false });
  }

  // On hash le password avec bcrypt avant de l'enregistrer en base de données
  const hashedPassword = await bcrypt.hash(password, 10);

  // On crée un nouvel utilisateur avec les données récupérées de la requête
  const newUser = await new userModel({
    username: username,
    email: email,
    password: hashedPassword,
  });
  
  // On enregistre l'utilisateur en base de données
  newUser
    .save()
    .then(() => {
      // Si l'enregistrement a réussi, on renvoie un message de succès avec les données de l'utilisateur
      res.status(200).json({ msg: "user created", username: username, email: email });
    })
    .catch((err) => {
      // Si l'enregistrement a échoué, on renvoie un message d'erreur
      res.status(400).json({ error: err.message });
    });
};
// On définit la fonction login qui sera exportée 
module.exports.login = async (req, res) => {
  // On recherche l'utilisateur en base de données avec le username fourni dans la requête
  userModel
    .findOne({ username: req.body.username })
    .then((user) => {
      // Si l'utilisateur n'est pas trouvé, on renvoie un message d'erreur
      if (!user) {
        return res.json({ msg: "User not found", status: false });
      }
      // Si l'utilisateur est trouvé, on compare le password fourni dans la requête avec le password hashé en base de données
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // Si le password est incorrect, on renvoie un message d'erreur
          if (!valid) {
            return res.json({
              msg: "Username or password invalid",
              status: false,
            });
          }
          // Si le password est correct, on génère un token d'accès avec jwt
          function generateAcessToken(data) {
            return jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: "30d",
            });
          }
          const acessToken = generateAcessToken(user);
          // On renvoie les données de l'utilisateur (sauf le password) et le token d'accès
          res.status(200).json({
            userId: user._id,
            username: req.body.username,
            iat: acessToken,
            password: undefined,
          });
        })
        .catch((error) => res.status(401).send(error.message));
    })
    .catch((error) => res.status(401).send(error.message));
};
