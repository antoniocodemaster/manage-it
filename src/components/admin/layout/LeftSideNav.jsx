import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {
  faPen,
  faCloud,
  faPowerOff,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const LeftSideNav = () => {
  return (
    <div className="left-side-nav">
      <ul>
        <li>
          <NavLink
            activeclassname="active"
            to="/admin/tasks"
            data-tip="Tasks"
            data-for="tasks-link-tooltip"
          >
            <FontAwesomeIcon icon={faPen} />
            <ReactTooltip id="tasks-link-tooltip" type="light" effect="solid" />
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclassname="active"
            to="/admin/weather"
            data-tip="Weather"
            data-for="weather-link-tooltip"
          >
            <FontAwesomeIcon icon={faCloud} />
            <ReactTooltip
              id="weather-link-tooltip"
              type="light"
              effect="solid"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclassname="active"
            to="#"
            data-for="favorites-link-tooltip"
            data-tip="Favorites"
          >
            <FontAwesomeIcon icon={faHeart} />
            <ReactTooltip
              id="favorites-link-tooltip"
              type="light"
              effect="solid"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclassname="active"
            to="/"
            data-for="logout-link-tooltip"
            data-tip="Logout"
          >
            <FontAwesomeIcon icon={faPowerOff} />
            <ReactTooltip
              id="logout-link-tooltip"
              type="light"
              effect="solid"
            />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideNav;
