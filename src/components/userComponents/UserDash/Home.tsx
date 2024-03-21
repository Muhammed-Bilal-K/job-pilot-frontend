import React from "react";
import NavBar from "../userNavbar/userNav";
import Jobpilot from "../../../assets/Logo.png";
import Notification from "../../../assets/BellRinging.png";
import user from "../../../assets/Ellipse 18.png";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Showcase/Dashboard";

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
        <Route path="/applied_jobs" element={""} />
        <Route path="/favorite_jobs" element={""} />
      </Routes>
    </>
  );
};

export default Home;
