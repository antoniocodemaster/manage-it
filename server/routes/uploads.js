const { Router } = require("express");
const { check } = require("express-validator");
const { updateAuthUserPic } = require("../controllers/uploads");
const { validateImg } = require("../middlewares/validate-img");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/user-pic/:id",
  [check("id", "Invalid id").isMongoId(), validateJWT, validateImg],
  updateAuthUserPic
);

module.exports = router;
