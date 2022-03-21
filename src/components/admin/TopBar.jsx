import profilePicture from "../../images/antonio-profile-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const TopBar = (props) => {
  return (
    <div className="top-bar">
      <FontAwesomeIcon
        icon={faBell}
        data-tip="Notifications"
        data-for="notifications-tooltip"
      />
      <ReactTooltip id="notifications-tooltip" type="light" effect="solid" />

      <FontAwesomeIcon
        icon={faMoon}
        onClick={props.changeActiveTheme}
        data-tip="Change theme"
        data-for="themes-tooltip"
      />
      <ReactTooltip id="themes-tooltip" type="light" effect="solid" />
      <img className="profile-picture" src={profilePicture} alt="" />
    </div>
  );
};

export default TopBar;
