import React from "react";
import NavBar from "../adminNavbar/adminNav";
import Jobpilot from "../../../assets/Logo.png";
import Notification from "../../../assets/BellRinging.png";
import user from "../../../assets/Ellipse 18.png";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Showcase/Dashboard";
import Candidate from "../Showcase/Candidate";
import Bills from "../Showcase/Bills";
import Employers from "../Showcase/Employers";

const Home: React.FC = () => {
  return (
    <>
      <NavBar
        logo={Jobpilot}
        notificationIcon={Notification}
        userProfileImage={user}
      />
      <Routes>
        <Route path="/admin-dash" element={<Dashboard />} />
        <Route path="/admin-dash/candidate_list" element={<Candidate />} />
        <Route path="/admin-dash/employer_list" element={<Employers />} />
        <Route path="/admin-dash/bills_details" element={<Bills />} />
      </Routes>
    </>
  );
};

export default Home;
