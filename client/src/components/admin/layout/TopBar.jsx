import profilePicture from "../../../images/antonio-profile-image.png";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import AccountDropdown from "../../snippets/AccountDropdown";

const TopBar = ({ changeActiveTheme }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleOpenDrodown = () => setIsDropdownActive(true)

  useEffect(() => {
    const handleCloseAccDropdown = () => {
       isDropdownActive && setIsDropdownActive(false);
    };

    document.addEventListener("click", handleCloseAccDropdown);

    return () => document.removeEventListener("click", handleCloseAccDropdown);
  }, [isDropdownActive]);


  return (
    <div className="top-bar">
      <AccountDropdown
        isDropdownActive={isDropdownActive}
      />
      <FontAwesomeIcon
        icon={faBell}
        data-tip="Notifications"
        data-for="notifications-tooltip"
      />
      <ReactTooltip id="notifications-tooltip" type="light" effect="solid" />

      <FontAwesomeIcon
        icon={faMoon}
        onClick={changeActiveTheme}
        data-tip="Change theme"
        data-for="themes-tooltip"
      />
      <ReactTooltip id="themes-tooltip" type="light" effect="solid" />
      <img onClick={handleOpenDrodown} className="profile-picture" src={profilePicture} alt="" />
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
