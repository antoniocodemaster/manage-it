const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
   return new Promise((resolve, reject) => {
      const payload = { uid, name };

      jwt.sign(
         payload,
         process.env.SECRET_JWT_SEED,
         {
            expiresIn: "30d",
         },
         (err, token) => {
            if (err) {
               console.log(err);
               reject("The token couldn't be generated");
            } else resolve(token);
         }
      );
   });
};

module.exports = { generateJWT };
