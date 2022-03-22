import { BrowserRouter as Router, NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <label htmlFor="user-name">Create User Name</label>
        <input id="user-name" type="text" />
        <label htmlFor="password">Create Password</label>
        <input id="password" type="password" />
        <label htmlFor="confirm-password">Create Password</label>
        <input id="confirm-password" type="password" />
        <button className="btn btn-primary">Sign Up</button>
        <div className="links">
          <NavLink activeclassname="active" to="/">
            Already have an account?
          </NavLink>
          <NavLink activeclassname="active" to="/password-reset">
            Forgot password?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
