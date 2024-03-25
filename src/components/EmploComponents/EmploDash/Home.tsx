import React from "react";
import NavBar from "../emploNavbar/EmploNav";
import Jobpilot from "../../../assets/Logo.png";
import Notification from "../../../assets/BellRinging.png";
import company from "../../../assets/facebook.png";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Showcase/Dashboard";
import MyJobs from "../Showcase/MyJobs";
import Postjob from "../Showcase/Postjob";
import { useSelector } from 'react-redux'

const Home: React.FC = () => {
  const { Employer } : any = useSelector((state)=>{
    return state
 }) 

 console.log(Employer);
 
  return (
    <>
      <NavBar
        logo={Jobpilot}
        notificationIcon={Notification}
        userProfileImage={company}
      />
      <Routes>
        <Route path="/emplo-dash" element={<Dashboard />} />
        <Route path="/emplo-dash/post_job" element={<Postjob />} />
        <Route path="/emplo-dash/my_jobs" element={<MyJobs />} />
      </Routes>
    </>
  );
};

export default Home;
