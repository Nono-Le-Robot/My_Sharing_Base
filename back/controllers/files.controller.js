const fs = require("fs");
const md5 = require("md5");
const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

module.exports.upload = (req, res) => {
  const { name, currentChunkIndex, totalChunks } = req.query;
  const originalName = name.split(".")[0];
  const firstChunk = parseInt(currentChunkIndex) === 0;
  const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;
  const ext = name.split(".").pop();
  const data = req.body.toString().split(",")[1];
  const buffer = new Buffer.from(data, "base64");
  const dateToString = Date.now().toString();
  const tmpFilename =
    "tmp_" + dateToString.substr(0, 4) + originalName + "." + ext;
  if (firstChunk && fs.existsSync("./files/" + tmpFilename)) {
    fs.unlinkSync("./files/" + tmpFilename);
  }
  fs.appendFileSync("./files/" + tmpFilename, buffer);
  if (lastChunk) {
    const finalFilename = Date.now() + " - " + originalName + "." + ext;
    fs.renameSync("./files/" + tmpFilename, "./files/" + finalFilename);
    res.json({ finalFilename });
  } else {
    res.json("ok");
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
                $push: {
                  files: {
                    username: req.body.username,
                    name: req.body.filename,
                    link: req.body.link,
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

module.exports.removeFile = (req, res) => {
  console.log("ok");
  const token = req.body.iat;
  const fileId = req.body.fileId;
  const fileName = req.body.fileName;
  jwt.verify(
    token,
    "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM",
    (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken);
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
  userModel.findById(_id, re);
};
