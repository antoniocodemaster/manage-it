import SignIn from "./components/registration/SignIng";
import SignUp from "./components/registration/SignUp";
import PasswordReset from "./components/registration/PasswordReset";
import Tasks from "./components/admin/tasks/Tasks";
import Weather from "./components/admin/weather/Weather";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./styles/styles.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/admin/tasks" element={<Tasks />} />
          <Route path="/admin/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
