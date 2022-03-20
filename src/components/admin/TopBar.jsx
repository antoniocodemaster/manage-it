import profilePicture from "../../images/antonio-profile-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";

const TopBar = (props) => {
  return (
    <div className="top-bar">
      <FontAwesomeIcon icon={faBell} />
      <FontAwesomeIcon icon={faMoon} onClick={props.changeActiveTheme} />
      <img className="profile-picture" src={profilePicture} alt="" />
    </div>
  );
};

export default TopBar;
