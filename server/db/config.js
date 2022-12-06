const mongoose = require("mongoose");
require("dotenv").config();

const { DB_CNN } = process.env;

const dbConnection = async () => {
   try {
      await mongoose.connect(DB_CNN, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });

      console.log("Mongo database connection established successfully");
   } catch (err) {
      console.log(err);
   }
};

module.exports = dbConnection;
