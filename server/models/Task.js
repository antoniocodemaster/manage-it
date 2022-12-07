const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "uncompleted",
    required: true,
  },

  uid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AuthUsers",
  },
});

TaskSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();

  object.id = _id;

  return object;
});

module.exports = model("tasks", TaskSchema);
