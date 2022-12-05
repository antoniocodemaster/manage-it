const { response } = require("express");

const isValidObjectData = (req, res = response, next) => {
  const isEmptyBodyKeys = Object.keys(req.body).every((value) => !value);

  //   const isEmptyBodyValues = Object.values(req.body).every((value) => !value);

  if (isEmptyBodyKeys && !req.files) {
    return res.status(400).json({ msg: "Invalid data" });
  }

  next();
};

module.exports = isValidObjectData;
