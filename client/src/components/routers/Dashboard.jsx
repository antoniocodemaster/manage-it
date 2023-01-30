import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { changeTheme } from "../../reducers/adminReducer";
import LeftSideNav from "../admin/layout/LeftSideNav";
import TopBar from "../admin/layout/TopBar";

//

const Dashboard = () => {
   const dispatch = useDispatch();

   const { authUser } = useSelector((state) => state.auth);

   const { activeTheme } = useSelector((state) => state.admin);

   useEffect(() => {
      const activeThemeLS = localStorage.getItem("activeTheme") || "light-theme";

      dispatch(changeTheme(activeThemeLS));
   }, [dispatch]);

   useEffect(() => {
      if (!activeTheme) return;

      localStorage.activeTheme = activeTheme;
   }, [activeTheme]);

   return (
      <div className={`admin-container ${activeTheme}`}>
         <LeftSideNav />
         <div className="right-side">
            <TopBar />
            {authUser?.id ? <Outlet /> : <Navigate to="/" />}
         </div>
      </div>
   );
};

export default Dashboard;
