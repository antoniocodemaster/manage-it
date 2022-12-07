const initialState = {
  authUser: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_AUTH_USER":
      return { ...state, authUser: payload };

    default:
      return state;
  }
};

export const setAuthUser = (user) => ({ type: "SET_AUTH_USER", payload: user });
