const { Router } = require("express");
const { check } = require("express-validator");
const { createAuthUser, loginUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("username", "Username is required").not().isEmpty(),
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
    check("username", "Invalid username").not().isEmpty(),
    check("password", "password should be more than 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
