import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { startCheckingAuthUser } from "../../reducers/authReducer";
import Charts from "../admin/charts/Charts";
import EditProfile from "../admin/edit-profile/EditProfile";
import Grid from "../admin/grid/Grid";
import Tasks from "../admin/tasks/Tasks";
import Weather from "../admin/weather/Weather";
import PasswordReset from "../auth/PasswordReset";
import SignIn from "../auth/SignIng";
import SignUp from "../auth/SignUp";
import Dashboard from "./Dashboard";

const ElementsRoutes = () => {
   const dispatch = useDispatch();

   const { isCheckingAuthUser } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(startCheckingAuthUser());
   }, [dispatch]);

   return (
      <Routes>
         {!isCheckingAuthUser && (
            <>
               <Route path="/" element={<SignIn />} />
               <Route path="/sign-up" element={<SignUp />} />
               <Route path="/password-reset" element={<PasswordReset />} />
               <Route path="/admin" element={<Dashboard />}>
                  <Route path="charts" element={<Charts />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="weather" element={<Weather />} />
                  <Route path="grid" element={<Grid />} />
                  <Route path="edit-profile" element={<EditProfile />} />
               </Route>
            </>
         )}
      </Routes>
   );
};

export default ElementsRoutes;
