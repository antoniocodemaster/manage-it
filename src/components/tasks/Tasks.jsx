import React, { useState } from "react";
import profilePicture from "../../images/antonio-profile-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMoon,
  faPen,
  faCloud,
  faPowerOff,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
  // state
  const [tasks, changeTasks] = useState(["Bar", "Foo"]);

  // functions
  const addNewTask = () => {
    const newTask = document.getElementById("new-task");
    if (newTask.value != "") {
      changeTasks([...tasks, newTask.value]);
      newTask.value = "";
    } else {
      alert(`New task can't be empty`);
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    console.log(`removing task`, index);
    newTasks.splice(index, 1);
    changeTasks(newTasks);
  };

  return (
    <div className="admin-container">
      <div className="left-side-nav">
        <ul>
          <li>
            <FontAwesomeIcon icon={faPen} />
          </li>
          <li>
            <FontAwesomeIcon icon={faCloud} />
          </li>
          <li>
            <FontAwesomeIcon icon={faHeart} />
          </li>
          <li>
            <FontAwesomeIcon icon={faPowerOff} />
          </li>
        </ul>
      </div>
      <div className="right-side">
        <div className="top-bar">
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faMoon} />
          <img className="profile-picture" src={profilePicture} alt="" />
        </div>
        <div className="widgets-container">
          <div className="admin-box tasks-list">
            <ul>
              {tasks.map((task, index) => {
                return (
                  <li key={index}>
                    {task}
                    <span
                      index={index}
                      onClick={() => {
                        removeTask(index);
                      }}
                      className="close-btn"
                    >
                      x
                    </span>
                  </li>
                );
              })}
            </ul>

            <div>
              <label htmlFor="">New Task</label>
              <input type="text" id="new-task" />
            </div>
            <div>
              <button className="btn btn-primary" onClick={addNewTask}>
                Add New Task
              </button>
            </div>
          </div>
          <div className="admin-box">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, officiis. Numquam non quam id ullam ratione amet est
            aliquam, odio vero accusamus dicta eligendi eum in sit. Rem, hic
            nesciunt?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
