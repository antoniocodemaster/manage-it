import { useMemo } from "react";
import useActiveClass from "../hooks/useActiveClass";

const ActiveClassEl = ({ el = "div", children, className, ...rest }) => {
   const activeClass = useActiveClass();

   const CustomTag = useMemo(() => el, [el]);

   return (
      <CustomTag {...rest} className={`${className}${activeClass}`}>
         {children}
      </CustomTag>
   );
};

export default ActiveClassEl;
