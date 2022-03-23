import { BrowserRouter as Router, NavLink } from "react-router-dom";

const PasswordReset = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <label htmlFor="user-name">User Name</label>
        <input id="user-name" type="text" />
        <button className="btn btn-primary">Reset Password</button>
        <div className="links">
          <NavLink activeclassname="active" to="/">
            Sing up
          </NavLink>
          <NavLink activeclassname="active" to="/sign-up">
            Don't have an account?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
