const fs = require("fs");
const md5 = require("md5");

module.exports.upload = (req, res) => {
  const { name, currentChunkIndex, totalChunks } = req.query;
  const originalName = name.split(".")[0];
  const firstChunk = parseInt(currentChunkIndex) === 0;
  const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;
  const ext = name.split(".").pop();
  const data = req.body.toString().split(",")[1];
  const buffer = new Buffer.from(data, "base64");
  const tmpFilename = "tmp_" + originalName + "." + ext;
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
