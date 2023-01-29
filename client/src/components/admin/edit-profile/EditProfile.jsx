import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import useForm from "../../../hooks/useForm";
import validateField from "../../../utils/validateField";
import ChangeAvatarModal from "../../molecules/ChangeAvatarModal";
import InputWrapper from "../../molecules/InputWrapper";
import profileImgSrc from "../../../images/antonio-profile-image.png";
import { updateAuthUser, uploadUserPic } from "../../../utils/authUser-actions";
import { setAuthUser } from "../../../reducers/authReducer";

const initialAuthUser = {
  emailAdd: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
};

const EditProfile = () => {
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.auth);

  const [user, handleInputChange, resetForm] = useForm(authUser || {});

  const { emailAdd, firstName, lastName, phoneNumber } = user;

  const [userValidations, setUserValidations] = useState({
    ...initialAuthUser,
  });
  const [isModalActive, setIsModalActive] = useState(false);
  const [avatarImg, setAvatarImg] = useState(null);
  const [avatarImgSrc, setAvatarImgSrc] = useState(
    authUser.picture || profileImgSrc
  );

  const handleChangeAvatar = (avatarImg) => {
    setAvatarImg(avatarImg);

    const fileReader = new FileReader();

    fileReader.readAsDataURL(avatarImg);

    fileReader.addEventListener("loadend", ({ target }) => {
      setAvatarImgSrc(target.result);
    });
  };

  const handleOpenModal = () => setIsModalActive(true);

  const handleUpdateUserInfo = async (e) => {
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

    if (avatarImg) {
      const [userPicUrl, err] = await uploadUserPic(avatarImg, authUser.id);

      if (err) {
        return swal({
          title: err,
          icon: "error",
          button: "Ok",
          timer: "5000",
        });
      }

      dispatch(setAuthUser({ ...authUser, picture: userPicUrl }));
    }

    const [userDB, err] = await updateAuthUser(user, authUser.id);

    if (err) {
      return swal({
        title: err,
        icon: "error",
        button: "Ok",
        timer: "5000",
      });
    }

    dispatch(setAuthUser(userDB));

    swal({
      title: "Profile updated successfully",
      icon: "success",
      button: "Ok",
      timer: "5000",
    });
  };

  useEffect(() => {
    Object.entries(user).forEach(([key, value]) => {
      if (!value) return;

      setUserValidations((prev) => ({ ...prev, [key]: true }));
    });
  }, [user]);

  return (
    <div className="widgets-container edit-page">
      <ChangeAvatarModal
        onChangeAvatar={handleChangeAvatar}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
      <div className="admin-box ag-3-4">
        <div className="user-info">
          <img src={avatarImgSrc} alt={firstName} />
          <h2>
            {authUser.firstName} {authUser.lastName}
          </h2>
        </div>
        <div className="edit-profile-form">
          <form onSubmit={handleUpdateUserInfo}>
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
            <label htmlFor="phone-number">Phone Number</label>
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              onClick={handleOpenModal}
              type="button"
              className="btn btn-secondary btn-change-image"
            >
              Change profile image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTheme: state.activeTheme,
  };
};

export default connect(mapStateToProps)(EditProfile);
