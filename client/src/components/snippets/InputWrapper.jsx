import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const InputWrapper = ({ children, activeClass }) => {
   return (
      <div className={`input-wrapper ${activeClass ? ` ${activeClass}` : ""}`}>
         {children}
         <div className="danger-icon">
            <FontAwesomeIcon icon={faCircleExclamation} />
         </div>
      </div>
   );
};

export default InputWrapper;
