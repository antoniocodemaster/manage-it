import React, { useEffect } from "react";
import TrasitionTrigger from "../utilities/TrasitionTrigger";


const Modal = ({ children, isModalActive = false, onClose = function () {} }) => {
   useEffect(() => {
      document.body.style.overflow = isModalActive ? "hidden" : "auto";
   }, [isModalActive]);

   const handleClose = ({ target, ...rest }) => {
      if (target.matches(".close-modal-btn") || target.matches(".custom-modal")) {
         onClose({ target, ...rest });
      }
   };

   return (
      <TrasitionTrigger activeClass="active" trigger={isModalActive}>
         <TrasitionTrigger.activeClassEl
            onClick={handleClose}
            className={"custom-modal"}
         >
            <div className="custom-modal-content-wrap">
               <button onClick={handleClose} className="close-modal-btn">
                  ✕
               </button>
               <div className="custom-modal-content">{children}</div>
            </div>
         </TrasitionTrigger.activeClassEl>
      </TrasitionTrigger>
   );
};

export default Modal;
