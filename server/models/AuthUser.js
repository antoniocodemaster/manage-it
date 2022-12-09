const { Schema, model } = require("mongoose");

const AuthUserSchema = Schema({
  emailAdd: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
  },

  picture: {
    type: String,
  },
});

AuthUserSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();

  object.id = _id;

  return object;
});

module.exports = model("authUsers", AuthUserSchema);
