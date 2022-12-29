const fs = require("fs"); // On importe le module "fs" qui permet de gérer les fichiers et dossiers sur le système
const userModel = require("../models/auth.model"); // On importe le modèle de données de l'utilisateur
const jwt = require("jsonwebtoken"); // On importe le module "jsonwebtoken" qui permet de manipuler les JWT (Json Web Tokens)

// On exporte la fonction "createFolder" qui permet de créer un dossier
module.exports.createFolder = async (req, res) => {
  // On récupère le token JWT dans la requête
  const token = req.body.token;

  // Si le token existe
  if (token) {
    // On vérifie la validité du token en utilisant la clé secrète spécifiée dans l'environnement
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      // Si une erreur est survenue lors de la vérification
      if (err) {
        console.log("err"); // On affiche l'erreur dans la console
      } else {
        // Si le token est valide, on récupère l'ID de l'utilisateur décodé du token
        const userId = decodedToken.data._id;
        // On récupère le nom du dossier à créer dans la requête
        const folderName = req.body.folderName;

        // On vérifie l'existence du dossier avec la méthode "access" de "fs"
        fs.access(`files/${userId}/${folderName}`, function (notFound) {
          // Si le dossier n'existe pas
          if (notFound) {
            // On crée le dossier avec la méthode "mkdirSync" de "fs"
            fs.mkdirSync(`files/${userId}/${folderName}`);
            // On envoie une réponse de status 200 (succès) avec le message "folder created"
            res.status(200).send("folder created");
          } else {
            // Si le dossier existe déjà, on envoie une réponse de status 400 (erreur de requête) avec le message "folder already exist"
            res.status(400).send("folder already exist");
          }
        });
      }
    });
  } else {
    // Si le token n'existe pas dans la requête, on envoie une réponse de status 404 (ressource non trouvée) avec le message "no token"
    res.status(404).send("no token");
  }
};



// On exporte la fonction "add" qui permet d'ajouter un fichier à la liste de fichiers de l'utilisateur
module.exports.add = (req, res) => {
  // On récupère le token JWT dans la requête
  const token = req.body.token;

  // Si le token existe
  if (token) {
    // On vérifie la validité du token en utilisant la clé secrète spécifiée dans l'environnement
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      // Si une erreur est survenue lors de la vérification
      if (err) {
        console.log("err"); // On affiche l'erreur dans la console
      } else {
        // Si le token est valide, on récupère l'ID de l'utilisateur décodé du token
        const userId = decodedToken.data._id;

        // On utilise la méthode "findByIdAndUpdate" du modèle "userModel" pour mettre à jour le document de l'utilisateur correspondant à l'ID spécifié
        userModel.findByIdAndUpdate(
          { _id: userId },
          {
            // On utilise l'opérateur "addToSet" de mongoDB pour ajouter un élément à un tableau de documents uniquement s'il n'existe pas déjà
            $addToSet: {
              files: {
                // On récupère les informations sur le fichier dans la requête
                username: req.body.username,
                name: req.body.filename,
                link: req.body.link,
                prev: req.body.prev,
                size: req.body.size,
                format: req.body.format,
              },
            },
          }
        )
          // On exclut le champ "password" de la réponse
          .select("-password")
          .then((updatedPost) => {
            // Si la mise à jour a réussi, on envoie une réponse avec le message "upload in DB OK"
            res.json({ msg: "upload in DB OK" });
          })
          .catch((err) =>
            // Si une erreur est survenue, on envoie une réponse avec l'erreur
            res.json({ err: err })
          );
      }
    });
  } else {
    // Si le token n'existe pas dans la requête, on envoie une réponse de status 404 (ressource non trouvée) avec le message "no token"
    res.status(404).send("no token");
  }
};


// On exporte la fonction "getFiles" qui permet de récupérer la liste de fichiers de l'utilisateur
module.exports.getFiles = (req, res) => {
  // On récupère le token JWT dans la requête
  const token = req.body.token;

  // Si le token existe
  if (token) {
    // On vérifie la validité du token en utilisant la clé secrète spécifiée dans l'environnement
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      // Si une erreur est survenue lors de la vérification
      if (err) {
        console.log(err); // On affiche l'erreur dans la console
      } else {
        // Si le token est valide, on récupère l'ID de l'utilisateur décodé du token
        const userId = decodedToken.data._id;

        // On utilise la méthode "findById" du modèle "userModel" pour récupérer le document de l'utilisateur correspondant à l'ID spécifié
        userModel
          .findById({ _id: userId })
          // On exclut le champ "password" de la réponse
          .select("-password")
          .then((findFiles) => {
            // Si la récupération a réussie, on envoie une réponse de status 200 (succès) avec la liste de fichiers de l'utilisateur
            res.status(200).json({ files: findFiles.files });
          })
          .catch((err) =>
            // Si une erreur est survenue, on envoie une réponse de status 400 (erreur de requête) avec l'erreur
            res.status(400).json({ err: err })
          );
      }
    });
  } else {
    // Si le token n'existe pas dans la requête, on envoie une réponse de status 404 (ressource non trouvée) avec le message "no token"
    res.status(404).send("no token");
  }
};

// On exporte la fonction "removeFiles" qui permet de supprimer un fichier de l'utilisateur
module.exports.removeFiles = (req, res) => {
  // On récupère le token JWT dans la requête
  const token = req.body.iat;

  // On vérifie la validité du token en utilisant la clé secrète spécifiée dans l'environnement
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    // Si une erreur est survenue lors de la vérification
    if (err) {
      console.log(err); // On affiche l'erreur dans la console
    } else {
      // Si le token est valide, on récupère l'ID de l'utilisateur décodé du token
      const userId = decodedToken.data._id;

      // On utilise la méthode "findByIdAndUpdate" du modèle "userModel" pour mettre à jour le document de l'utilisateur correspondant à l'ID spécifié
      // On utilise l'opérateur de mise à jour "$pull" pour retirer l'élément du tableau "files" qui correspond au nom de fichier spécifié dans la requête
      userModel
        .findByIdAndUpdate(
          { _id: userId },
          {
            $pull: {
              files: {
                name: req.body.fileName,
              },
            },
          }
        )
        .select("-password") // On exclut le champ "password" du document retourné
        .then((updatedPost) => {
          // Une fois le document mis à jour, on utilise la méthode "unlink" de "fs" (module de gestion de fichiers de Node.js) pour supprimer le fichier
          fs.unlink(`./files/${userId}/${req.body.fileName}`, () => {
            // Si le fichier est une image (au format PNG, JPG, JPEG ou GIF)
            if (
              req.body.fileName.substr(-3) === "png" ||
              req.body.fileName.substr(-3) === "jpg" ||
              req.body.fileName.substr(-4) === "jpeg" ||
              req.body.fileName.substr(-3) === "gif"
            ) {
              // On utilise à nouveau la méthode "unlink" de "fs" pour supprimer la version miniature de l'image
              fs.unlink(`./files/${userId}/prev/${req.body.fileName}`, () => {
                res.json({ msg: "upload in DB OK" });
              });
            } else {
              res.json({ msg: "upload in DB OK" });
            }
          });
        })
        .catch((err) => res.json({ err: err })); // Si une erreur est survenue lors de la mise à jour du document, on la retourne dans la réponse
    }
  });
};