const { Router } = require("express");
const { check } = require("express-validator");
const {
  getTasks,
  addNewTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const isValidObjectData = require("../middlewares/isValidObjectData");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/get-tasks", getTasks);

router.post(
  "/new",
  [
    check("name", "Task name is required").not().isEmpty(),
    isValidObjectData,
    validateFields,
  ],
  addNewTask
);

router.put(
  "/update/:id",
  [
    check("name", "Task name is required").not().isEmpty(),
    check("id", "Invalid task id").isMongoId(),
    isValidObjectData,
    validateFields,
  ],
  updateTask
);

router.delete(
  "/delete/:id",
  [check("id", "Invalid task id").isMongoId(), validateFields],
  deleteTask
);

module.exports = router;
