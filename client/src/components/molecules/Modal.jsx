import React, { useEffect } from "react";

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
      <div className={`custom-modal${isModalActive ? " active" : ""}`}>
         <div className="custom-modal-content-wrap">
            <button onClick={handleClose} className="close-modal-btn">
               ✕
            </button>
            <div className="custom-modal-content">{children}</div>
         </div>
      </div>
   );
};

export default Modal;
