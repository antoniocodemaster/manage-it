import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import swal from "sweetalert";
import useForm from "../../../hooks/useForm";
import validateField from "../../../utils/validateField";
import ChangeAvatarModal from "../../snippets/ChangeAvatarModal";
import InputWrapper from "../../snippets/InputWrapper";
import LeftSideNav from "../layout/LeftSideNav";
import TopBar from "../layout/TopBar";
import profileImgSrc from "../../../images/antonio-profile-image.png";

const initialAuthUser = {
  username: "antonioAdmin",
  firstName: "Antonio",
  lastName: "Flores",
  phoneNumber: "123456789",
  address: "asdasd",
};

const EditProfile = () => {
  const { activeTheme } = useSelector((state) => state.admin);

  const [user, handleInputChange, resetForm] = useForm(initialAuthUser);

  const { username, firstName, lastName, phoneNumber, address } = user;

  const [userValidations, setUserValidations] = useState({
    ...initialAuthUser,
  });
  const [isModalActive, setIsModalActive] = useState(false);
  const [avatarImg, setAvatarImg] = useState(null);
  const [avatarImgSrc, setAvatarImgSrc] = useState(profileImgSrc);

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

    if (Object.values(user).every((value) => !value)) {
      resetForm();
    }

    const alertConfig = {
      iconType: "error",
      btnMsg: "Ok",
      timer: "4000",
    };

    const userForm = {
      username,
      firstName,
      lastName,
      phoneNumber,
      address,
    };

    const areEmptyInputs = validateField({
      condition: Object.values(userForm).some((value) => !value),
      msg: "Please, complete all required fields",
      ...alertConfig,
    });

    Object.entries(user).forEach(([key, value]) =>
      setUserValidations((prev) => ({ ...prev, [key]: !!value }))
    );

    if (areEmptyInputs) return;

    swal({
      title: "Profile updated successfully",
      icon: "success",
      button: "Ok",
      timer: "5000",
    });
  };

  useEffect(() => {
    const userForm = { username, firstName, lastName, phoneNumber, address };

    Object.entries(userForm).forEach(([key, value]) => {
      if (!value) return;

      setUserValidations((prev) => ({ ...prev, [key]: true }));
    });
  }, [username, firstName, lastName, phoneNumber, address]);

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
          <h2>{firstName}</h2>
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
            <label htmlFor="address">Address</label>
            <InputWrapper
              activeClass={userValidations.address === false && "invalid"}
            >
              <input
                name="address"
                value={address || ""}
                onChange={handleInputChange}
                id="address"
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
