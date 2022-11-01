require("./config/db.js");
const bodyParser = require("body-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const filesRoutes = require("./routes/files.routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "500mb" }));

// app.use("/portfolio/my-sharing-base/api/auth", authRoutes);
// app.use("/portfolio/my-sharing-base/", filesRoutes);
// app.use("/portfolio/my-sharing-base/files", express.static("files"));

app.use("/api/auth", authRoutes);
app.use("/", filesRoutes);
app.use("/files", express.static("files"));

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
