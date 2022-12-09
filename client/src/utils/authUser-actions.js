import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const uploadUserPic = async (userPic, uid) => {
  const URL = `${REACT_APP_API_URL}/uploads/user-pic/${uid}`;

  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Request without token");

    const rqstConfig = {
      headers: { "x-token": token },
    };

    const formData = new FormData();

    formData.append("image", userPic);

    const { data } = await axios.post(URL, formData, rqstConfig);

    return [data, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};

export const updateAuthUser = async (user, id) => {
  const URL = `${REACT_APP_API_URL}/auth/update-user/${id}`;

  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Request without token");

    const reqConfig = { headers: { "x-token": token } };

    console.log(user)

    const { data } = await axios.put(URL, user, reqConfig);

    return [data.user, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};
