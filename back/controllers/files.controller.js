const fs = require("fs");
const md5 = require("md5");
const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");

// Définition de la fonction d'upload de fichier
module.exports.upload = async (req, res) => {
  // Récupération du token d'authentification dans l'URL de la requête
  const token = req.query.uploadBy;

  // Vérification du token
  if (token) {
    // Vérification du token avec la clé secrète définie dans les variables d'environnement
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("err");
      } else {
        // Récupération de l'ID de l'utilisateur à partir du token décodé
        const userId = decodedToken.data._id;

        // Récupération des informations sur le fichier à partir de l'URL de la requête
        const { name, currentChunkIndex, totalChunks } = req.query;

        // Extraction du nom original du fichier sans l'extension
        const originalName = name.split(".")[0];

        // Détermination si c'est le premier ou le dernier chunk du fichier
        const firstChunk = parseInt(currentChunkIndex) === 0;
        const lastChunk =
          parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;

        // Extraction de l'extension du fichier
        const ext = name.split(".").pop();

        // Récupération des données du chunk à partir du corps de la requête
        const data = req.body.toString().split(",")[1];

        // Conversion des données en buffer
        const buffer = new Buffer.from(data, "base64");

        // Génération du nom temporaire du fichier
        const dateToString = Date.now().toString();
        const tmpFilename =
          "tmp_" +
          dateToString.substr(0, 4) +
          originalName.replace(" ", "_") +
          "." +
          ext;

        // Vérification de l'existence du dossier de l'utilisateur
        fs.access(`files/${userId}`, function (notFound) {
          if (notFound) {
            // Création du dossier de l'utilisateur si inexistant
            fs.mkdirSync(`files/${userId}`);
          }
        });

// Mise en place d'un délai de 200ms avant d'exécuter les opérations suivantes
setTimeout(() => {
  // Si c'est le premier chunk et que le fichier temporaire existe déjà, suppression de ce dernier
  if (firstChunk && fs.existsSync(`./files/${userId}/` + tmpFilename)) {
    fs.unlinkSync(`./files/${userId}/` + tmpFilename);
  }

  // Ajout du chunk au fichier temporaire
  fs.appendFileSync(`./files/${userId}/` + tmpFilename, buffer);

  // Si c'est le dernier chunk
  if (lastChunk) {
    // Génération du nom final du fichier
    const finalFilename =
      Date.now() + "_" + originalName.replace(" ", "_") + "." + ext;

    // Renommage du fichier temporaire avec le nom final
    fs.renameSync(
      `./files/${userId}/` + tmpFilename,
      `./files/${userId}/` + finalFilename
    );

    // Si le fichier est une image
    if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
      // Vérification de l'existence du dossier "prev"
      fs.access(`files/${userId}/prev`, function (notFound) {
        if (notFound) {
          // Création du dossier "prev" s'il n'existe pas
          fs.mkdirSync(`files/${userId}/prev`);
        }
      });

      // Génération du nom de l'image de prévisualisation
      let outputPrevImage = `./files/${userId}/prev/${finalFilename}`;

      // Redimensionnement de l'image avec la bibliothèque Sharp
      sharp(`./files/${userId}/${finalFilename}`)
        .resize({ height: 600, width: 800 })
        .toFile(outputPrevImage)
        // En cas de succès, renvoi du nom final du fichier
        .then(function (newFileInfo) {
          res.json({ finalFilename });
        })
        // En cas d'erreur, affichage de l'erreur dans la console
        .catch((err) => console.log(err));
    } else {
      // Si ce n'est pas une image, renvoi du nom final du fichier
      res.json({ finalFilename });
    }
  } else {
    // Si ce n'est pas le dernier chunk, renvoi de la réponse "ok"
    res.json("ok");
  }
}, 200);
      }
    });
  } else {
    // Si le token n'existe pas dans la requête, on envoie une réponse de status 404 (ressource non trouvée) avec le message "no token"
    res.status(404).send("no token");
  }
};

module.exports.add = (req, res) => {
  // Récupération du token envoyé dans la requête
  const token = req.body.token;

  if (token) {
    // Vérification du token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("err");
      } else {
        // Récupération de l'ID de l'utilisateur décodé dans le token
        const userId = decodedToken.data._id;

        // Recherche de l'utilisateur dans la base de données et mise à jour de la liste des fichiers avec les informations du fichier envoyé dans la requête
        userModel
          .findByIdAndUpdate(
            { _id: userId },
            {
              $addToSet: {
                files: {
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
          // Exclusion du mot de passe du résultat de la requête
          .select("-password")
          // En cas de succès
          .then((updatedPost) => {
            // Renvoi d'un message de succès
            res.json({ msg: "upload in DB OK" });
          })
          // En cas d'erreur
          .catch((err) => {
            // Renvoi de l'erreur
            res.json({ err: err });
          });
      }
    });
  } else {
    // Si aucun token n'a été envoyé dans la requête, renvoi d'un statut 404 et d'un message d'erreur
    res.status(404).send("no token");
  }
};


module.exports.getFiles = (req, res) => {
  // Récupération du token envoyé dans la requête
  const token = req.body.token;

  if (token) {
    // Vérification du token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        // Récupération de l'ID de l'utilisateur décodé dans le token
        const userId = decodedToken.data._id;

        // Recherche de l'utilisateur dans la base de données
        userModel
          .findById({ _id: userId })
          // Exclusion du mot de passe du résultat de la requête
          .select("-password")
          // En cas de succès
          .then((findFiles) => {
            // Renvoi de la liste des fichiers de l'utilisateur
            res.status(200).json({ files: findFiles.files });
          })
          // En cas d'erreur
          .catch((err) => {
            // Renvoi d'un statut 400 et de l'erreur
            res.status(400).json({ err: err });
          });
      }
    });
  } else {
    // Si aucun token n'a été envoyé dans la requête, renvoi d'un statut 404 et d'un message d'erreur
    res.status(404).send("no token");
  }
};


module.exports.removeFiles = (req, res) => {
  // Récupération du token envoyé dans la requête
  const token = req.body.iat;

  // Vérification du token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      console.log(err);
    } else {
      // Récupération de l'ID de l'utilisateur décodé dans le token
      const userId = decodedToken.data._id;

      // Recherche de l'utilisateur dans la base de données et suppression du fichier de la liste de ses fichiers
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
        // Exclusion du mot de passe du résultat de la requête
        .select("-password")
        // En cas de succès
        .then((updatedPost) => {
          // Suppression du fichier sur le serveur
          fs.unlink(`./files/${userId}/${req.body.fileName}`, () => {
            // Si le fichier est une image
            if (
              req.body.fileName.substr(-3) === "png" ||
              req.body.fileName.substr(-3) === "jpg" ||
              req.body.fileName.substr(-4) === "jpeg" ||
              req.body.fileName.substr(-3) === "gif"
            ) {
              // Suppression de la miniature du fichier sur le serveur
              fs.unlink(`./files/${userId}/prev/${req.body.fileName}`, () => {
                // Renvoi d'un message de succès
                res.json({ msg: "upload in DB OK" });
              });
            } else {
              // Si le fichier n'est pas une image, renvoi d'un message de succès
              res.json({ msg: "upload in DB OK" });
            }
          });
        })
        // En cas d'erreur
        .catch((err) => res.json({ err: err }));
    }
  });
};
