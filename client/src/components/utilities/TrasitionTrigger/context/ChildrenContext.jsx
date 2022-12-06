import { createContext, useReducer } from "react";

export const ChildrenContext = createContext();

const initState = {
   activeClass: "",
};

function reducer(state, { type, payload }) {
   if (type === "SET_ACTIVE_CLASS") return { ...state, activeClass: payload };
}

const ChildrenProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initState);

   return (
      <ChildrenContext.Provider value={{ state, dispatch }}>
         {children}
      </ChildrenContext.Provider>
   );
};

export default ChildrenProvider;
