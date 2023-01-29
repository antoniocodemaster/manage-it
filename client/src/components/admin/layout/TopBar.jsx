import profilePicture from "../../../images/antonio-profile-image.png";
import { connect, useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import AccountDropdown from "../../molecules/AccountDropdown";
import { changeTheme } from "../../../reducers/adminReducer";

const TopBar = () => {
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.auth);

  const { activeTheme } = useSelector((state) => state.admin);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleOpenDrodown = () => setIsDropdownActive(true);

  const handleChangeTheme = () => {
    dispatch(
      changeTheme(activeTheme === "light-theme" ? "dark-theme" : "light-theme")
    );
  };

  useEffect(() => {
    const handleCloseAccDropdown = () => {
      isDropdownActive && setIsDropdownActive(false);
    };

    document.addEventListener("click", handleCloseAccDropdown);

    return () => document.removeEventListener("click", handleCloseAccDropdown);
  }, [isDropdownActive]);

  return (
    <div className="top-bar">
      <AccountDropdown isDropdownActive={isDropdownActive} />
      <FontAwesomeIcon
        icon={faBell}
        data-tip="Notifications"
        data-for="notifications-tooltip"
      />
      <ReactTooltip id="notifications-tooltip" type="light" effect="solid" />

      <FontAwesomeIcon
        icon={faMoon}
        onClick={handleChangeTheme}
        data-tip="Change theme"
        data-for="themes-tooltip"
      />
      <ReactTooltip id="themes-tooltip" type="light" effect="solid" />
      <img
        onClick={handleOpenDrodown}
        className="profile-picture"
        src={authUser.picture || profilePicture}
        alt=""
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTheme: state.activeTheme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeActiveTheme: () => {
      dispatch({
        type: "change-theme",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
