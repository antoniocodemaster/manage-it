import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../reducers/authReducer";

const AccountDropdown = ({ isDropdownActive }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch(setAuthUser(null));
  };

  return (
    <div className={`account-dropdown${isDropdownActive ? " active" : ""}`}>
      <ul className="dropdown-items">
        <li className="dropdown-item">
          <Link to="/admin/edit-profile">
            <span className="dropdown-item-icon">
              <FontAwesomeIcon icon={faGear} />
            </span>
            <span className="dropdown-item-description">Edit profile</span>
          </Link>
        </li>
        <li onClick={handleLogout} className="dropdown-item">
          <Link to="/">
            <span className="dropdown-item-icon">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span className="dropdown-item-description">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AccountDropdown;
