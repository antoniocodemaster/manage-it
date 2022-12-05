import { useContext, useMemo } from "react";
import { ChildrenContext } from "../context/ChildrenContext";

const useActiveClass = () => {
   const {
      state: { activeClass },
   } = useContext(ChildrenContext);

   const activeClassMemo = useMemo(() => activeClass, [activeClass]);

   return activeClassMemo;
};

export default useActiveClass;
