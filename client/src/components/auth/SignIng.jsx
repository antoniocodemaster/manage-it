import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Navigate, NavLink } from "react-router-dom";
import swal from "sweetalert";
import useForm from "../../hooks/useForm";
import { setAuthUser } from "../../reducers/authReducer";
import { loginUser } from "../../utils/auth";
import validateField from "../../utils/validateField";
import InputWrapper from "../snippets/InputWrapper";

const initialUser = {
  emailAdd: null,
  password: null,
};

const SignIn = () => {
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.auth);

  const [user, handleInputChange, resetForm] = useForm(initialUser);

  const [userValidations, setUserValidations] = useState({
    ...initialUser,
  });

  const { emailAdd, password } = user;

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

    const [userDB, err] = await loginUser(user);

    if (err) {
      return swal({
        title: err,
        icon: "error",
        button: "Ok",
        timer: "5000",
      });
    }

    localStorage.authUser = JSON.stringify(userDB);
    localStorage.token = userDB.token;

    dispatch(setAuthUser(userDB));
  };

  useEffect(() => {
    const { password, ...rest } = user;

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
  }, [user]);

  if (authUser?.id) return <Navigate to="/admin/charts" />;

  return (
    <div className="signin-container">
      <div className="signin-box">
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="email-add">Email Address</label>
          <InputWrapper
            activeClass={userValidations.emailAdd === false && "invalid"}
          >
            <input
              name="emailAdd"
              value={emailAdd || ""}
              onChange={handleInputChange}
              id="email-add"
              type="text"
            />
          </InputWrapper>
          <label htmlFor="password">Password</label>
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
          <button className="btn btn-primary">Sign In</button>
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
