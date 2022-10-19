const userModel = require("../models/auth.model");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const checkUser = await userModel.findOne({ username });
  const checkEmail = await userModel.findOne({ email });
  if (checkUser) {
    return res.json({ msg: "Username already used", status: false });
  }
  if (checkEmail) {
    return res.json({ msg: "Email already used", status: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await new userModel({
    username: username,
    email: email,
    password: hashedPassword,
  });

  newUser
    .save()
    .then(() => {
      res
        .status(200)
        .json({ msg: "user created", username: username, email: email });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const checkUser = await userModel.findOne({ username });
  if (!checkUser) {
    return res.json({ msg: "Wrong username or password", status: false });
  }
  const checkPassword = await bcrypt.compare(password, checkUser.password);
  if (!checkPassword) {
    return res.json({ msg: "Wrong username or password", status: false });
  }
  res.json({
    status: true,
    msg: `Login success !`,
    userId: checkUser._id,
    username: checkUser.username,
  });
};
