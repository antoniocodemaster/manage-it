import { useContext, useEffect } from "react";
import { ChildrenContext } from "../context/ChildrenContext";

const ChildrenElements = ({ children, activeClass }) => {
   const { dispatch } = useContext(ChildrenContext);

   useEffect(() => {
      dispatch({ type: "SET_ACTIVE_CLASS", payload: activeClass });
   }, [activeClass, dispatch]);

   return <>{children}</>;
};

export default ChildrenElements;
