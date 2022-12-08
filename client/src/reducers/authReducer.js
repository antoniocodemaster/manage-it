import { renewToken } from "../utils/auth";

const initialState = {
  authUser: null,
  isCheckingAuthUser: true,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_AUTH_USER":
      return { ...state, authUser: payload };

    case "SET_IS_CHECKING_AUTH_USER":
      return { ...state, isCheckingAuthUser: payload };

    default:
      return state;
  }
};

export const setAuthUser = (user) => ({ type: "SET_AUTH_USER", payload: user });

export const setIsCheckingAuthUser = (isChecking) => ({
  type: "SET_IS_CHECKING_AUTH_USER",
  payload: isChecking,
});

export const startCheckingAuthUser = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(setIsCheckingAuthUser(false));

    try {
      const [user] = await renewToken(token);

      if (user) dispatch(setAuthUser(user));

      dispatch(setIsCheckingAuthUser(false));
    } catch (error) {
      console.log(error);
      dispatch(setIsCheckingAuthUser(false));
    }
  };
};
