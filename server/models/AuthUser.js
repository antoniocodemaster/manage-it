const { Schema, model } = require("mongoose");

const AuthUserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  },
});

AuthUserSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();

  object.id = _id;

  return object;
});

module.exports = model("authUsers", AuthUserSchema);
