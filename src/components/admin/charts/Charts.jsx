import { connect } from "react-redux";
import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";
import SimpleBarChart from "./SimpleBarChart";
import SimpleRadarChart from "./SimpleRadarChart";
import PieChartWithCustomizedLabel from "./PieChartWithCustomizedLabel";
import PieChartWithPaddingAngle from "./PieChartWithPaddingAngle";

const Charts = ({ activeTheme }) => {
  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar />
        <div className="widgets-container">
          <div className="admin-box ag-2-4">
            <PieChartWithCustomizedLabel />
          </div>
          <div className="admin-box ag-2-4">
            <SimpleBarChart />
          </div>
          <div className="admin-box ag-2-4">
            <SimpleRadarChart />
          </div>

          <div className="admin-box ag-2-4">
            <PieChartWithPaddingAngle />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTheme: state.activeTheme,
  };
};

export default connect(mapStateToProps)(Charts);
