const { Router } = require("express");
const { check } = require("express-validator");
const {
  createAuthUser,
  loginUser,
  renewToken,
  updateAuthUser,
} = require("../controllers/auth");
const isValidObjectData = require("../middlewares/isValidObjectData");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("emailAdd", "Invalid email").isEmail(),
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("password", "Password should be more than 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createAuthUser
);

router.post(
  "/",
  [
    check("emailAdd", "Invalid email").not().isEmpty(),
    check("password", "password should be more than 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, renewToken);

router.put(
  "/update-user/:id",
  [
    validateJWT,
    isValidObjectData,
    check("id", "Invalid id").isMongoId(),
    validateFields,
  ],
  updateAuthUser
);

module.exports = router;
