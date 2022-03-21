import LeftSideNav from "../LeftSideNav";
import TopBar from "../TopBar";
import React, { useState } from "react";

const Weather = () => {
  // state
  const [activeTheme, setActiveTheme] = useState("light-theme");

  const changeActiveTheme = () => {
    if (activeTheme == "light-theme") {
      setActiveTheme("dark-theme");
    } else {
      setActiveTheme("light-theme");
    }
  };

  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar changeActiveTheme={changeActiveTheme} />
        <div className="widgets-container">
          <div className="admin-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, officiis. Numquam non quam id ullam ratione amet
              est aliquam, odio vero accusamus dicta eligendi eum in sit. Rem,
              hic nesciunt?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
