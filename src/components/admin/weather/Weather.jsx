import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";
import { connect } from "react-redux";
import WeatherInfo from "./WeatherInfo";

const Weather = ({ activeTheme }) => {
  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar />
        <div className="widgets-container">
          <WeatherInfo />
        </div>
      </div>
    </div>
  );
};

const mapStateTopProps = (state) => {
  return {
    activeTheme: state.activeTheme,
  };
};

export default connect(mapStateTopProps)(Weather);
