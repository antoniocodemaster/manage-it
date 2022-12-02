import SignIn from "./components/auth/SignIng";
import SignUp from "./components/auth/SignUp";
import PasswordReset from "./components/auth/PasswordReset";
import Tasks from "./components/admin/tasks/Tasks";
import Weather from "./components/admin/weather/Weather";
import Grid from "./components/admin/grid/Grid";
import Charts from "./components/admin/charts/Charts";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/adminReducer";
import "./styles/styles.scss";
import EditProfile from "./components/admin/edit-profile/EditProfile";

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
            <Route path="/admin/charts" element={<Charts />} />
            <Route path="/admin/tasks" element={<Tasks />} />
            <Route path="/admin/weather" element={<Weather />} />
            <Route path="/admin/grid" element={<Grid />} />
            <Route path="/admin/edit-profile" element={<EditProfile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
