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
  firstName: null,
  lastName: null,
  emailAdd: null,
  phoneNumber: null,
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

  const {
    firstName,
    lastName,
    emailAdd,
    phoneNumber,
    password,
    confirmPassword,
  } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const alertConfig = {
      iconType: "error",
      btnMsg: "Ok",
      timer: "4000",
    };

    const { phoneNumber, ...rest } = user;

    const areEmptyInputs = validateField({
      condition: Object.values(rest).some((value) => !value),
      msg: "Please, complete all required fields",
      ...alertConfig,
    });

    Object.entries(rest).forEach(([key, value]) =>
      setUserValidations((prev) => ({ ...prev, [key]: !!value }))
    );

    if (areEmptyInputs) return;

    const isInvalidPass = validateField({
      condition: password?.length < 6,
      msg: "Password should be more than 6 caracters",
      ...alertConfig,
    });

    if (isInvalidPass) {
      return setUserValidations((prev) => ({ ...prev, password: false }));
    }

    const isInvalidConfirmPass = validateField({
      condition: password !== confirmPassword,
      msg: "Both passwords should be equal",
      ...alertConfig,
    });

    if (isInvalidConfirmPass) return;

    const validUserProps = Object.entries(user)
      .filter(([, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const [userDB, err] = await registerUser(validUserProps);

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
      <form onSubmit={handleSubmit} className="signin-box signup-form">
        <label htmlFor="first-name">First Name</label>
        <InputWrapper
          activeClass={userValidations.firstName === false && "invalid"}
        >
          <input
            name="firstName"
            value={firstName || ""}
            onChange={handleInputChange}
            id="first-name"
            type="text"
          />
        </InputWrapper>
        <label htmlFor="last-name">Last Name</label>
        <InputWrapper
          activeClass={userValidations.lastName === false && "invalid"}
        >
          <input
            name="lastName"
            value={lastName || ""}
            onChange={handleInputChange}
            id="last-name"
            type="text"
          />
        </InputWrapper>
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
        <label htmlFor="phone-number">Phone number</label>
        <InputWrapper
          activeClass={userValidations.phoneNumber === false && "invalid"}
        >
          <input
            name="phoneNumber"
            value={phoneNumber || ""}
            onChange={handleInputChange}
            id="phone-number"
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
        <label htmlFor="confirm-password">Confirm Password</label>
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
