import swal from "sweetalert";

const validateField = ({ condition, msg, iconType, btnMsg, timer }) => {
   if (condition) {
      swal({
         title: msg,
         icon: iconType,
         button: btnMsg,
         timer,
      });

      return true;
   }

   return false;
};

export default validateField;
