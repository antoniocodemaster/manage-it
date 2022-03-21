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
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/adminPanelReducers";
import "./styles/styles.scss";

function App() {
  const store = createStore(reducer);
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/admin/tasks" element={<Tasks />} />
            <Route path="/admin/weather" element={<Weather />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
