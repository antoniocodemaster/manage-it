const PasswordReset = () => {
  return (
    <div className="signin-container">
      <form className="signin-box">
        <label htmlFor="user-name">User Name</label>
        <input id="user-name" type="text" />
        <button className="btn btn-primary">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;
