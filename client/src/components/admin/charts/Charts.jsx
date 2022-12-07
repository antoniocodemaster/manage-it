import { connect, useSelector } from "react-redux";
import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";
import SimpleBarChart from "./SimpleBarChart";
import SimpleRadarChart from "./SimpleRadarChart";
import SimpleAreaChart from "./SimpleAreaChart";
import PieChartWithCustomizedLabel from "./PieChartWithCustomizedLabel";
import PieChartWithPaddingAngle from "./PieChartWithPaddingAngle";

const Charts = () => {
  const { activeTheme } = useSelector((state) => state.admin);

  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar />
        <div className="widgets-container graphics-page">
          <div className="title-box">
            <h1>Report Graphics</h1>
          </div>
          <div className="admin-box ag-2-4">
            <SimpleBarChart />
          </div>
          <div className="admin-box ag-1-4">
            <PieChartWithCustomizedLabel />
          </div>
          <div className="admin-box ag-1-4">
            <PieChartWithPaddingAngle />
          </div>
          <div className="admin-box ag-2-4">
            <SimpleAreaChart />
          </div>
          <div className="admin-box ag-2-4">
            <SimpleRadarChart />
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
