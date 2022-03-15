import { BrowserRouter as Router, NavLink } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="signin-container">
      <NavLink activeclassname="active" to="/sign-in">
        Sign In
      </NavLink>
      <br />
      <NavLink activeclassname="active" to="/admin/tasks">
        Tasks
      </NavLink>
      <form className="signin-box">
        <label htmlFor="user-name">User Name</label>
        <input id="user-name" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <button className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
