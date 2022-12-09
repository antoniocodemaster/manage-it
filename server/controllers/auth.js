const AuthUser = require("../models/AuthUser");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createAuthUser = async (req, res = response) => {
  const { emailAdd, password } = req.body;

  try {
    let user = await AuthUser.findOne({ emailAdd });

    const alreadyExistUserMsg = "The User Already exist with that email";

    if (user)
      return res.status(400).json({ ok: false, msg: alreadyExistUserMsg });

    user = new AuthUser(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id, user.emailAdd);

    res.status(201).json({ ...user.toJSON(), token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

const loginUser = async (req, res = response) => {
  const { emailAdd, password } = req.body;

  try {
    let user = await AuthUser.findOne({ emailAdd });

    if (!user) return res.status(400).json({ ok: false, msg: "Invalid User" });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res.status(400).json({ ok: false, msg: "Invalid password" });

    const token = await generateJWT(user.id, user.emailAdd);

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
  const { uid, emailAdd } = req;

  const token = await generateJWT(uid, emailAdd);

  const userDB = await AuthUser.findById(uid);

  res.json({ ...userDB.toJSON(), token });
};

const updateAuthUser = async (req, res = response) => {
  const { id } = req.params;

  try {
    const userWithValidData = await AuthUser.findById(id);

    const { lastName, firstName, emailAdd, phoneNumber } = req.body || {};

    const reqUser = { lastName, firstName, emailAdd, phoneNumber };

    const validUser = Object.entries(reqUser)
      .filter(([, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const userDB = await AuthUser.findOne({ username: req.body.emailAdd });

    if (req.body.emailAdd !== userWithValidData.emailAdd && userDB) {
      return res
        .status(400)
        .json({ msg: "Already exist a user with that email" });
    }

    const updatedUser = await AuthUser.findByIdAndUpdate(id, validUser, {
      new: true,
    });

    res.json({ ok: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { createAuthUser, loginUser, renewToken, updateAuthUser };
