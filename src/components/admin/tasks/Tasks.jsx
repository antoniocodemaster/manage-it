import React, { useState } from "react";
import LeftSideNav from "../LeftSideNav";
import TopBar from "../TopBar";

const Tasks = () => {
  // state
  const [activeTheme, setActiveTheme] = useState("light-theme");
  const [tasks, setTasks] = useState(["Bar", "Foo"]);

  // functions
  const changeActiveTheme = () => {
    if (activeTheme == "light-theme") {
      setActiveTheme("dark-theme");
    } else {
      setActiveTheme("light-theme");
    }
  };

  const addNewTask = () => {
    const newTask = document.getElementById("new-task");
    if (newTask.value != "") {
      setTasks([...tasks, newTask.value]);
      newTask.value = "";
    } else {
      alert(`New task can't be empty`);
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    console.log(`removing task`, index);
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar changeActiveTheme={changeActiveTheme} />
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
