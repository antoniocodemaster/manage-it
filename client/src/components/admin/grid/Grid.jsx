import { connect } from "react-redux";
import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";
import Grid4of4 from "./Grid4of4";
import Grid3of4 from "./Grid3of4";
import Grid2of4 from "./Grid2of4";
import Grid1of4 from "./Grid1of4";

const Grid = ({ activeTheme }) => {
  return (
    <div className="widgets-container">
      {/* row */}
      <Grid3of4 />
      <Grid1of4 />
      {/* row */}
      <Grid3of4 />
      <Grid1of4 />
      {/* row */}
      <Grid2of4 />
      <Grid2of4 />
      {/* row */}
      <Grid1of4 />
      <Grid1of4 />
      <Grid1of4 />
      <Grid1of4 />
      {/* row */}
      <Grid4of4 />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTheme: state.activeTheme,
  };
};

export default connect(mapStateToProps)(Grid);
