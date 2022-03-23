import { connect } from "react-redux";
import Taskslist from "./TasksList";
import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";

const Tasks = ({ activeTheme }) => {
  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar />
        <div className="widgets-container">
          <Taskslist />
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

export default connect(mapStateToProps)(Tasks);
