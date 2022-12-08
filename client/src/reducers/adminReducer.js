const initialState = {
  activeTheme: "light-theme",
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "change-theme":
      return {
        ...state,
        activeTheme: payload,
      };

    default:
      return state;
  }
};

export const changeTheme = (theme) => ({
  type: "change-theme",
  payload: theme,
});

export default adminReducer;
