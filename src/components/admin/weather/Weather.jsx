import LeftSideNav from "../LeftSideNav";
import TopBar from "../TopBar";

const Weather = () => {
  return (
    <div className="admin-container">
      <LeftSideNav />
      <div className="right-side">
        <TopBar />
        <div className="widgets-container">
          <div className="admin-box">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, officiis. Numquam non quam id ullam ratione amet est
            aliquam, odio vero accusamus dicta eligendi eum in sit. Rem, hic
            nesciunt?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
