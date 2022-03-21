import React, { useState } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import LeftSideNav from "../LeftSideNav";
import TopBar from "../TopBar";

const Tasks = ({activeTheme}) => {
  // state
  const [tasks, setTasks] = useState([
    {
      name: "Bar",
      status: "open",
    },
    {
      name: "Foo",
      status: "open",
    },
    {
      name: "BarFoo",
      status: "closed",
    },
    {
      name: "Foobar",
      status: "open",
    },
  ]);

  // functions
  const changeActiveTheme = () => {
    // if (activeTheme === "light-theme") {
    //   setActiveTheme("dark-theme");
    // } else {
    //   setActiveTheme("light-theme");
    // }
  };

  const swtichTaskStatus = (index) => {
    const newTasks = [...tasks];
    if (tasks[index].status === "open") {
      tasks[index].status = "closed";
    } else {
      tasks[index].status = "open";
    }
    setTasks(newTasks);
  };

  const addNewTask = () => {
    const newTask = document.getElementById("new-task");
    if (newTask.value !== "") {
      setTasks([
        ...tasks,
        {
          name: newTask.value,
          status: "open",
        },
      ]);
      newTask.value = "";
    } else {
      swal({
        title: "New task can't be empty",
        text: "Please add some text to create a task",
        icon: "error",
        button: "Ok",
        timer: "4000",
      }).then(() => {
        document.getElementById("new-task").focus();
      });
    }
  };

  const removeTask = (index) => {
    swal({
      title: "Are you sure?",
      text: "This action can't be undone",
      icon: "warning",
      timer: "8000",
      buttons: ["No", "Yes"],
    }).then((yesRemove) => {
      if (yesRemove) {
        const newTasks = [...tasks];
        console.log(`removing task`, index);
        newTasks.splice(index, 1);
        setTasks(newTasks);
        swal({
          title: "Task has been removed",
          icon: "success",
          timer: "4000",
        });
      }
    });
  };

  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar changeActiveTheme={changeActiveTheme} />
        <div className="widgets-container">
          <div className="admin-box tasks-list">
            <h2>Tasks list</h2>
            <ul className="tasks-list no-selection">
              {tasks.map((task, index) => {
                return (
                  <li
                    key={index}
                    className={`task task-${task.status}`}
                    onClick={() => {
                      swtichTaskStatus(index);
                    }}
                  >
                    {task.name}
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
          {/* <div className="admin-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, officiis. Numquam non quam id ullam ratione amet
              est aliquam, odio vero accusamus dicta eligendi eum in sit. Rem,
              hic nesciunt?
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTheme: state.activeTheme,
  };
};

export default connect(mapStateToProps)(Tasks);
