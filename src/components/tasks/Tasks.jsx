import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
  return (
    <div className="admin-container">
      <div className="left-side-nav">
        <ul>
          <li>Bar</li>
          <li>Foo</li>
        </ul>
      </div>
      <div className="right-side-container">
        <div className="top-bar">
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faMoon} />
        </div>
        <div className="admin-box">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, officiis. Numquam non quam id ullam ratione amet est
          aliquam, odio vero accusamus dicta eligendi eum in sit. Rem, hic
          nesciunt?
        </div>
        <div className="admin-box">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, officiis. Numquam non quam id ullam ratione amet est
          aliquam, odio vero accusamus dicta eligendi eum in sit. Rem, hic
          nesciunt?
        </div>
      </div>
    </div>
  );
};

export default Tasks;
