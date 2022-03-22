const initialState = {
  activeTheme: "light-theme",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "change-theme":
      let theme = "";
      if (state.activeTheme === "light-theme") {
        theme = "dark-theme";
      } else {
        theme = "light-theme";
      }
      return {
        ...state,
        activeTheme: theme,
      };

    default:
      return state;
  }
};

export default reducer;
