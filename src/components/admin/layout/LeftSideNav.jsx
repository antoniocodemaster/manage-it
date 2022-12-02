import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {
  faPen,
  faCloud,
  faPowerOff,
  faBorderAll,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const LeftSideNav = () => {
  return (
    <div className="left-side-nav">
      <ul>
        <li>
          <NavLink
            activeclassname="active"
            to="/admin/charts"
            data-tip="Charts"
            data-for="charts-link-tooltip"
          >
            <FontAwesomeIcon icon={faChartLine} />
            <ReactTooltip
              id="charts-link-tooltip"
              type="light"
              effect="solid"
            />
          </NavLink>
        </li>
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
            to="/admin/grid"
            data-for="grid-link-tooltip"
            data-tip="Grid"
          >
            <FontAwesomeIcon icon={faBorderAll} />
            <ReactTooltip
              id="grid-link-tooltip"
              type="light"
              effect="solid"
              place="right"
            />
          </NavLink>
        </li>
        {/* <li>
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
        </li> */}
      </ul>
    </div>
  );
};

export default LeftSideNav;
