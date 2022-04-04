import { connect } from "react-redux";
import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";

const Charts = ({ activeTheme }) => {
  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar />
        <div className="widgets-container">
          <div className="admin-box ag-1-4">
            <p className="big-text">1/4</p>
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
