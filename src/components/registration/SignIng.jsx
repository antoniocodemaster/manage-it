import { BrowserRouter as Router, NavLink } from "react-router-dom";

const SignIn = () => {
  const authenticateUser = (e) => {
    e.preventDefault();
    console.log("form submitted");
    // authenticate user and send them to admin
    window.location = "/admin/tasks";
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <form action="">
          <label htmlFor="user-name">User Name</label>
          <input id="user-name" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
          <button
            className="btn btn-primary"
            onClick={(e) => {
              authenticateUser(e);
            }}
          >
            Sign In
          </button>
        </form>
        <div className="links">
          <NavLink activeclassname="active" to="/password-reset">
            Forgot password?
          </NavLink>
          <NavLink activeclassname="active" to="/sign-up">
            Don't have an account?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
