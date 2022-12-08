import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, NavLink, Navigate } from "react-router-dom";
import swal from "sweetalert";
import useForm from "../../hooks/useForm";
import { setAuthUser } from "../../reducers/authReducer";
import { registerUser } from "../../utils/auth";
import validateField from "../../utils/validateField";
import InputWrapper from "../snippets/InputWrapper";

const initialUser = {
  username: null,
  password: null,
  confirmPassword: null,
};

const SignUp = () => {
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.auth);

  const [user, handleInputChange, resetForm] = useForm(initialUser);

  const [userValidations, setUserValidations] = useState({
    ...initialUser,
  });

  const { username, password, confirmPassword } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const alertConfig = {
      iconType: "error",
      btnMsg: "Ok",
      timer: "4000",
    };

    const areEmptyInputs = validateField({
      condition: Object.values(user).some((value) => !value),
      msg: "Please, complete all required fields",
      ...alertConfig,
    });

    Object.entries(user).forEach(([key, value]) =>
      setUserValidations((prev) => ({ ...prev, [key]: !!value }))
    );

    if (areEmptyInputs) return;

    const isInvalidPass = validateField({
      condition: password?.length < 6,
      msg: "Password should be more than 6 caracters",
      ...alertConfig,
    });

    if (isInvalidPass) return;

    const isInvalidConfirmPass = validateField({
      condition: password !== confirmPassword,
      msg: "Both passwords should be equal",
      ...alertConfig,
    });

    if (isInvalidConfirmPass) return;

    const [userDB, err] = await registerUser(user);

    if (err) {
      return swal({
        title: err,
        icon: "error",
        button: "Ok",
        timer: "5000",
      });
    }

    localStorage.authUser = JSON.stringify(userDB);
    localStorage.token = userDB.token

    dispatch(setAuthUser(userDB));
  };

  useEffect(() => {
    const { password, confirmPass, ...rest } = user;

    Object.entries(rest).forEach(([key, value]) => {
      if (!value) return;

      setUserValidations((prev) => ({ ...prev, [key]: true }));
    });
  }, [user]);

  useEffect(() => {
    setUserValidations((prev) => {
      if (prev.password === null) return prev;

      return { ...prev, password: user.password?.length >= 6 };
    });

    setUserValidations((prev) => {
      if (prev.confirmPass === null || !user.confirmPassword) return prev;

      const { password, confirmPassword } = user;

      return { ...prev, confirmPassword: password === confirmPassword };
    });
  }, [user]);

  if (authUser?.id) return <Navigate to="/admin/charts" />;

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-box">
        <label htmlFor="user-name">Create User Name</label>
        <InputWrapper
          activeClass={userValidations.username === false && "invalid"}
        >
          <input
            name="username"
            value={username || ""}
            onChange={handleInputChange}
            id="user-name"
            type="text"
          />
        </InputWrapper>
        <label htmlFor="password">Create Password</label>
        <InputWrapper
          activeClass={userValidations.password === false && "invalid"}
        >
          <input
            name="password"
            value={password || ""}
            onChange={handleInputChange}
            id="password"
            type="password"
          />
        </InputWrapper>
        <label htmlFor="confirm-password">Create Password</label>
        <InputWrapper
          activeClass={userValidations.confirmPassword === false && "invalid"}
        >
          <input
            name="confirmPassword"
            value={confirmPassword || ""}
            onChange={handleInputChange}
            id="confirm-password"
            type="password"
          />
        </InputWrapper>
        <button className="btn btn-primary">Sign Up</button>
        <div className="links">
          <NavLink activeclassname="active" to="/">
            Already have an account?
          </NavLink>
          <NavLink activeclassname="active" to="/password-reset">
            Forgot password?
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
