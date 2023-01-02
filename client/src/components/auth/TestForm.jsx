import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { email as emailRegEx } from "../../helpers/form-reg-exs";
import useForm from "../../hooks/useForm";
import InputWrapper from "../snippets/InputWrapper";

const initialUser = {
   firstName: null,
   email: null,
   password: null,
   city: null,
   state: null,
   zip: null,
};

const TestForm = () => {
   const [user, handleInputChange, resetForm] = useForm(initialUser);
   const [inputCheck, setInputCheck] = useState(false);

   const [userValidations, setUserValidations] = useState({
      ...initialUser,
   });

   const handleSubmit = (e) => {
      e.preventDefault();

      const { firstName, email } = user;

      const requiredFields = { firstName, email };

      const isInValidUser = Object.values(requiredFields).some((value) => !value);

      Object.entries(requiredFields).forEach(([key, value]) => {
         setUserValidations((prev) => ({ ...prev, [key]: !prev[key] ? false : !!value }));
      });

      if (isInValidUser) {
         return swal({
            title: "Please, Complete All Required Fields",
            icon: "error",
            button: "Ok",
            timer: "5000",
         });
      }

      if (!emailRegEx.test(user.email)) {
         setUserValidations((prev) => ({ ...prev, email: false }));

         return swal({
            title: "Invalid Email",
            icon: "error",
            button: "Ok",
            timer: "5000",
         });
      }

      swal({
         title: "Data sended successfully",
         icon: "success",
         button: "Ok",
         timer: "5000",
      });
   };

   useEffect(() => {
      const { firstName, email } = user;

      const requiredFields = { firstName, email };

      Object.entries(requiredFields).forEach(([key, value]) => {
         value !== null && setUserValidations((prev) => ({ ...prev, [key]: !!value }));
      });
   }, [user]);

   useEffect(() => {
      if (user.email === null) return;

      setUserValidations((prev) => ({ ...prev, email: emailRegEx.test(user.email) }));
   }, [user.email]);

   return (
      <div className="test-form-page page-container">
         <form onSubmit={handleSubmit} className="signin-box">
            <h2>Form grid layout</h2>
            <label>
               <span>First Name</span>
               <InputWrapper
                  activeClass={userValidations.firstName === false && "invalid"}
               >
                  <input
                     value={user.firstName || ""}
                     onChange={handleInputChange}
                     name="firstName"
                     type="text"
                     placeholder="Enter Your First Name"
                  />
               </InputWrapper>
            </label>
            <div className="form-row">
               <label>
                  <span>Email</span>
                  <InputWrapper
                     activeClass={userValidations.email === false && "invalid"}
                  >
                     <input
                        value={user.email || ""}
                        onChange={handleInputChange}
                        name="email"
                        type="text"
                        placeholder="Enter Your Email ID"
                     />
                  </InputWrapper>
               </label>
               <label>
                  <span>Password</span>
                  <InputWrapper
                     activeClass={userValidations.password === false && "invalid"}
                  >
                     <input
                        value={user.password || ""}
                        onChange={handleInputChange}
                        name="password"
                        type="text"
                        placeholder="Enter Your Password"
                     />
                  </InputWrapper>
               </label>
            </div>
            <div className="form-row">
               <label>
                  <span>City</span>
                  <InputWrapper activeClass={userValidations.city === false && "invalid"}>
                     <input
                        value={user.city || ""}
                        onChange={handleInputChange}
                        name="city"
                        type="text"
                        placeholder="Enter Your Living city"
                     />
                  </InputWrapper>
               </label>
               <label>
                  <span>State</span>
                  <InputWrapper
                     activeClass={userValidations.state === false && "invalid"}
                  >
                     <input
                        value={user.state || ""}
                        onChange={handleInputChange}
                        name="state"
                        type="text"
                        placeholder="Choose..."
                     />
                  </InputWrapper>
               </label>
               <label>
                  <span>Zip</span>
                  <InputWrapper activeClass={userValidations.zip === false && "invalid"}>
                     <input
                        value={user.zip || ""}
                        onChange={handleInputChange}
                        name="zip"
                        type="text"
                        placeholder="Enter your Zip Code"
                     />
                  </InputWrapper>
               </label>
            </div>
            <label className="checkbox-container">
               <input
                  value={inputCheck}
                  onChange={() => setInputCheck((prev) => !prev)}
                  type="checkbox"
               />
               <span>Check me out</span>
            </label>
            <div className="submit-btn-container">
               <button className="btn btn-primary">Submit</button>
            </div>
         </form>
      </div>
   );
};

export default TestForm;
