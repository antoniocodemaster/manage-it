import { connect, useSelector } from "react-redux";
import Taskslist from "./TasksList";
import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";

const Tasks = () => {
  const { activeTheme } = useSelector((state) => state.admin);

  return (
    <div className="widgets-container">
      <Taskslist />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTheme: state.activeTheme,
  };
};

export default connect(mapStateToProps)(Tasks);
