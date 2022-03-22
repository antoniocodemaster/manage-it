import profilePicture from "../../images/antonio-profile-image.png";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const TopBar = ({ changeActiveTheme }) => {
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
        onClick={changeActiveTheme}
        data-tip="Change theme"
        data-for="themes-tooltip"
      />
      <ReactTooltip id="themes-tooltip" type="light" effect="solid" />
      <img className="profile-picture" src={profilePicture} alt="" />
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
