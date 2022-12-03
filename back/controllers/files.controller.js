const fs = require("fs");
const md5 = require("md5");
const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");

module.exports.upload = async (req, res) => {
  const token = req.query.uploadBy;
  if (token) {
    jwt.verify(
      token,
      "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM",
      (err, decodedToken) => {
        if (err) {
          console.log("err");
        } else {
          const userId = decodedToken.data._id;
          const { name, currentChunkIndex, totalChunks } = req.query;
          const originalName = name.split(".")[0];
          const firstChunk = parseInt(currentChunkIndex) === 0;
          const lastChunk =
            parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;
          const ext = name.split(".").pop();
          const data = req.body.toString().split(",")[1];
          const buffer = new Buffer.from(data, "base64");
          const dateToString = Date.now().toString();
          const tmpFilename =
            "tmp_" +
            dateToString.substr(0, 4) +
            originalName.replace(" ", "_") +
            "." +
            ext;
          fs.access(`files/${userId}`, function (notFound) {
            if (notFound) {
              fs.mkdirSync(`files/${userId}`);
            }
          });
          setTimeout(() => {
            if (
              firstChunk &&
              fs.existsSync(`./files/${userId}/` + tmpFilename)
            ) {
              fs.unlinkSync(`./files/${userId}/` + tmpFilename);
            }
            fs.appendFileSync(`./files/${userId}/` + tmpFilename, buffer);
            if (lastChunk) {
              const finalFilename =
                Date.now() + "_" + originalName.replace(" ", "_") + "." + ext;
              fs.renameSync(
                `./files/${userId}/` + tmpFilename,
                `./files/${userId}/` + finalFilename
              );

              if (
                ext === "png" ||
                ext === "jpg" ||
                ext === "jpeg" ||
                ext === "gif"
              ) {
                fs.access(`files/${userId}/prev`, function (notFound) {
                  if (notFound) {
                    fs.mkdirSync(`files/${userId}/prev`);
                  }
                });

                let outputPrevImage = `./files/${userId}/prev/${finalFilename}`;
                sharp(`./files/${userId}/${finalFilename}`)
                  .resize({ height: 600, width: 800 })
                  .toFile(outputPrevImage)
                  .then(function (newFileInfo) {
                    res.json({ finalFilename });
                  })
                  .catch((err) => console.log(err));
              } else {
                res.json({ finalFilename });
              }
            } else {
              res.json("ok");
            }
          }, 200);
        }
      }
    );
  } else {
    res.status(404).send("no token");
  }
};

module.exports.add = (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(
      token,
      "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM",
      (err, decodedToken) => {
        if (err) {
          console.log("err");
        } else {
          const userId = decodedToken.data._id;

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
            .select("-password")
            .then((updatedPost) => {
              res.json({ msg: "upload in DB OK" });
            })
            .catch((err) => res.json({ err: err }));
        }
      }
    );
  } else {
    res.status(404).send("no token");
  }
};

module.exports.getFiles = (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(
      token,
      "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM",
      (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          const userId = decodedToken.data._id;
          userModel
            .findById({ _id: userId })
            .select("-password")
            .then((findFiles) => {
              res.status(200).json({ files: findFiles.files });
            })
            .catch((err) => res.status(400).json({ err: err }));
        }
      }
    );
  } else {
    res.status(404).send("no token");
  }
};

module.exports.removeFiles = (req, res) => {
  const token = req.body.iat;
  jwt.verify(
    token,
    "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM",
    (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        const userId = decodedToken.data._id;
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
          .select("-password")
          .then((updatedPost) => {
            fs.unlink(`./files/${userId}/${req.body.fileName}`, () => {
              if (
                req.body.fileName.substr(-3) === "png" ||
                req.body.fileName.substr(-3) === "jpg" ||
                req.body.fileName.substr(-4) === "jpeg" ||
                req.body.fileName.substr(-3) === "gif"
              ) {
                fs.unlink(`./files/${userId}/prev/${req.body.fileName}`, () => {
                  res.json({ msg: "upload in DB OK" });
                });
              } else {
                res.json({ msg: "upload in DB OK" });
              }
            });
          })
          .catch((err) => res.json({ err: err }));
      }
    }
  );
};
