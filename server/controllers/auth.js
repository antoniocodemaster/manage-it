const AuthUser = require("../models/AuthUser");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createAuthUser = async (req, res = response) => {
  const { username, password } = req.body;

  try {
    let user = await AuthUser.findOne({ username });

    const alreadyExistUserMsg = "The User Already exist with that username";

    if (user)
      return res.status(400).json({ ok: false, msg: alreadyExistUserMsg });

    user = new AuthUser(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id, user.username);

    res.status(201).json({ ...user.toJSON(), token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

const loginUser = async (req, res = response) => {
  const { username, password } = req.body;

  try {
    let user = await AuthUser.findOne({ username });

    if (!user) return res.status(400).json({ ok: false, msg: "Invalid User" });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res.status(400).json({ ok: false, msg: "Invalid password" });

    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      msg: "Login",
      ...user.toJSON(),
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const renewToken = async (req, res = response) => {
  const { uid, username } = req;

  const token = await generateJWT(uid, username);

  const userDB = await AuthUser.findById(uid);

  res.json({ ...userDB.toJSON(), token });
};

module.exports = { createAuthUser, loginUser, renewToken };
