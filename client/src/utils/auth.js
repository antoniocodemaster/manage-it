import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const registerUser = async (user) => {
  const URL = `${REACT_APP_API_URL}/auth/new`;

  try {
    const { data } = await axios.post(URL, user);

    return [data, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};

export const loginUser = async ({ username, password }) => {
  const URL = `${REACT_APP_API_URL}/auth`;

  try {
    const { data } = await axios.post(URL, { username, password });

    return [data, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};

export const renewToken = async (token) => {
  const URL = `${REACT_APP_API_URL}/auth/renew`;

  const rqstConfig = {
    headers: { "x-token": token },
  };

  try {
    const { data } = await axios.get(URL, rqstConfig);

    return [data, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};
