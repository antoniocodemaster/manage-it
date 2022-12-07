import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import {
  getAllTasks,
  addNewTask as addNewTaskDB,
  deleteTask,
  updateTask,
} from "../../../utils/task-actions";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // functions
  const swtichTaskStatus = (id) => {
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          const taskStatus =
            task.status === "completed" ? "uncompleted" : "completed";

          const updatedTask = {
            ...task,
            status: taskStatus,
          };

          updateTask(id, {
            status: taskStatus,
          });

          return updatedTask;
        }

        return task;
      });
    });
  };

  const addNewTask = async () => {
    if (!taskInput) {
      return swal({
        title: "New task can't be empty",
        text: "Please add some text to create a task",
        icon: "error",
        button: "Ok",
        timer: "4000",
      }).then(() => {
        document.getElementById("new-task").focus();
      });
    }

    const [createdTask, err] = await addNewTaskDB({ name: taskInput });

    if (err) {
      return swal({
        title: err,
        icon: "error",
        button: "Ok",
        timer: "4000",
      });
    }

    setTasks((prev) => [...prev, createdTask]);

    swal({
      title: "Task created successfully",
      icon: "success",
      button: "Ok",
      timer: "5000",
    });
  };

  const removeTask = (id) => {
    swal({
      title: "Are you sure?",
      text: "This action can't be undone",
      icon: "warning",
      timer: "8000",
      buttons: ["No", "Yes"],
    }).then(async (yesRemove) => {
      if (!yesRemove) return;

      const [, err] = await deleteTask(id);

      if (err) {
        return swal({
          title: err,
          icon: "error",
          button: "Ok",
          timer: "4000",
        });
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));

      swal({
        title: "Task has been removed",
        icon: "success",
        timer: "4000",
      });
    });
  };

  useEffect(() => {
    getAllTasks().then(([tasks]) => setTasks(tasks || []));
  }, []);

  return (
    <div className="admin-box  ag-4-4 tasks-list">
      <h2>Tasks list</h2>
      <ul className="tasks-list no-selection">
        {tasks.map((task, index) => {
          return (
            <li key={index} className={`task task-${task.status}`}>
              <span
                onClick={() => {
                  swtichTaskStatus(task.id);
                }}
              >
                {task.name}
              </span>
              <span
                onClick={() => {
                  removeTask(task.id);
                }}
                className="close-btn"
              >
                ✕
              </span>
            </li>
          );
        })}
      </ul>

      <div>
        <label htmlFor="">New Task</label>
        <input
          onChange={({ target }) => setTaskInput(target.value)}
          type="text"
          id="new-task"
          value={taskInput}
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={addNewTask}>
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default TasksList;
