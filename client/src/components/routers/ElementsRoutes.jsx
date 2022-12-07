import React from "react";
import { Route, Routes } from "react-router-dom";
import Charts from "../admin/charts/Charts";
import EditProfile from "../admin/edit-profile/EditProfile";
import Grid from "../admin/grid/Grid";
import Tasks from "../admin/tasks/Tasks";
import Weather from "../admin/weather/Weather";
import PasswordReset from "../auth/PasswordReset";
import SignIn from "../auth/SignIng";
import SignUp from "../auth/SignUp";

const ElementsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/admin/charts" element={<Charts />} />
      <Route path="/admin/tasks" element={<Tasks />} />
      <Route path="/admin/weather" element={<Weather />} />
      <Route path="/admin/grid" element={<Grid />} />
      <Route path="/admin/edit-profile" element={<EditProfile />} />
    </Routes>
  );
};

export default ElementsRoutes;
