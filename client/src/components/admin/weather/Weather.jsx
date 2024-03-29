import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";
import { connect, useSelector } from "react-redux";
import WeatherInfo from "./WeatherInfo";

const Weather = () => {
  const { activeTheme } = useSelector((state) => state.admin);

  return (
    <div className="widgets-container">
      <WeatherInfo />
    </div>
  );
};

const mapStateTopProps = (state) => {
  return {
    activeTheme: state.activeTheme,
  };
};

export default connect(mapStateTopProps)(Weather);
