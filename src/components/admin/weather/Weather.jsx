import LeftSideNav from "../LeftSideNav";
import TopBar from "../TopBar";
import { connect } from "react-redux";

const Weather = ({ activeTheme }) => {
  return (
    <div className={`${activeTheme} admin-container`}>
      <LeftSideNav />
      <div className="right-side">
        <TopBar />
        <div className="widgets-container">
          <div className="admin-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, officiis. Numquam non quam id ullam ratione amet
              est aliquam, odio vero accusamus dicta eligendi eum in sit. Rem,
              hic nesciunt?
            </p>
          </div>
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
