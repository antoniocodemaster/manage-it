import React, { useEffect, useRef, useState } from "react";
import ChildrenProvider from "../context/ChildrenContext";
import ActiveClassEl from "./activeClassEl";
import ChildrenElements from "./ChildrenElements";

const TransitionTrigger = ({
   activeClass: componentActiveClass,
   trigger,
   children,
   onTrasitionEnd = function () {},
}) => {
   const [activeClass, setActiveClass] = useState("");
   const [isComponentRendered, setIsComponentRendered] = useState(null);

   const componentWrapRef = useRef(null);

   useEffect(() => {
      let timeOut;

      if (trigger) {
         setIsComponentRendered(true);
         timeOut = setTimeout(() => {
            setActiveClass(` ${componentActiveClass}`);
         }, 0);
      } else {
         setActiveClass("");
      }

      return () => clearTimeout(timeOut);
   }, [trigger, componentActiveClass, activeClass]);

   useEffect(() => {
      let timeout;

      let lastTrasitionProp = 0;

      const trasitionsArr = [];

      const getElTrasitionDurNumVal = (el) => {
         if (el) {
            const elCssObj = getComputedStyle(el);
            const transitionDurProp = elCssObj.getPropertyValue("transition-duration");
            const trasitionDurNumVal = parseFloat(transitionDurProp.split("s")[0]);

            if (trasitionDurNumVal !== 0) return trasitionsArr.push(trasitionDurNumVal);

            [...el.children].forEach((item) => getElTrasitionDurNumVal(item));
         }
      };

      const componentWrapChildren = componentWrapRef.current?.children;

      if (componentWrapRef.current) {
         const componentWrapChildrenArr = Array.from(componentWrapChildren);

         componentWrapChildrenArr.forEach((el) => getElTrasitionDurNumVal(el));

         lastTrasitionProp = Math.max(...trasitionsArr);
      }

      if (!trigger && isComponentRendered) {
         timeout = setTimeout(() => {
            setIsComponentRendered(false);

            onTrasitionEnd(lastTrasitionProp * 1000);
         }, lastTrasitionProp * 1000);
      }

      return () => clearTimeout(timeout);
   }, [trigger, isComponentRendered, componentWrapRef, onTrasitionEnd]);

   return (
      <ChildrenProvider>
         {trigger ? (
            <div
               style={{ display: "unset" }}
               className="trasition-trigger-wrap"
               ref={componentWrapRef}
            >
               <ChildrenElements activeClass={activeClass} children={children} />
            </div>
         ) : (
            isComponentRendered && (
               <div
                  style={{ display: "unset" }}
                  className="trasition-trigger-wrap"
                  ref={componentWrapRef}
               >
                  <ChildrenElements activeClass={activeClass} children={children} />
               </div>
            )
         )}
      </ChildrenProvider>
   );
};

TransitionTrigger.activeClassEl = ActiveClassEl;

export default TransitionTrigger;
