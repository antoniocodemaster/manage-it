import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
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
          <NavLink activeclassname="active" to="/admin/tasks">
            <FontAwesomeIcon icon={faPen} />
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/admin/weather">
            <FontAwesomeIcon icon={faCloud} />
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="#">
            <FontAwesomeIcon icon={faHeart} />
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/sign-in">
            <FontAwesomeIcon icon={faPowerOff} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideNav;
