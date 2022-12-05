const { response } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) => {
   const errors = validationResult(req);

   const errorsArr = Object.values(errors).map((item) => item);

   const [, errorMsgsArr] = errorsArr;
   const errorsMsgs = errorMsgsArr.map((error) => error.msg).join(", ");

   if (!errors.isEmpty()) return res.status(400).json({ msg: errorsMsgs });

   next();
};

module.exports = { validateFields };
