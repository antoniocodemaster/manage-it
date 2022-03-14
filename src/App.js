import SignIn from "./components/sing-in/SignIng";
import Tasks from "./components/tasks/Tasks";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./styles/styles.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavLink activeclassname="active" to="/sign-in">
          Sign In
        </NavLink>
        <br />
        <NavLink activeclassname="active" to="/tasks">
          Tasks
        </NavLink>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
