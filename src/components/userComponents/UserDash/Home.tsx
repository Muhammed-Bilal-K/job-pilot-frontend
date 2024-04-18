import React from "react";
import NavBar from "../userNavbar/userNav";
import Jobpilot from "../../../assets/Logo.png";
import Notification from "../../../assets/BellRinging.png";
import user from "../../../assets/Ellipse 18.png";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Showcase/Dashboard";
import AppliedJob from "../AppliedJobs/AppliedJob";
import FavoriteJob from "../FavoriteJobs/FavoriteJob";
import UserInfo from "../Showcase/Settings/UserInfo";
import UserAccount from "../Showcase/Settings/UserAccount";

const Home: React.FC = () => {
  return (
    <>
      <NavBar
        logo={Jobpilot}
        notificationIcon={Notification}
        userProfileImage={user}
      />
      <Routes>
        <Route path="/user-dash" element={<Dashboard />} />
        <Route path="/user-dash/applied_jobs" element={<AppliedJob />} />
        <Route path="/user-dash/favorite_jobs" element={<FavoriteJob />} />
        <Route path="/user-dash/settings" element={<UserInfo />} />
        <Route path="/user-dash/user-settings" element={<UserAccount />} />
      </Routes>
    </>
  );
};

export default Home;
