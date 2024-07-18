import React from "react";
import NavBar from "../emploNavbar/EmploNav";
import Jobpilot from "../../../assets/Logo.png";
import Notification from "../../../assets/BellRinging.png";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Showcase/Dashboard";
import MyJobs from "../Showcase/MyJobs";
import Postjob from "../Showcase/Postjob";
import CompanyInfo from "../Showcase/Settings/CompanyInfo";
import AllApplicant from "../Showcase/JobApplicant/AllApplicant";
import { ShortList } from "../Showcase/JobApplicant/ShortList";
import FoundingInfo from "../Showcase/Settings/FoundingInfo";
import PlanDetails from "../Showcase/PlanDetails";

const Home: React.FC = () => {
  return (
    <>
      <NavBar
        logo={Jobpilot}
        notificationIcon={Notification}
      />
      <Routes>
        <Route path="/emplo-dash" element={<Dashboard />} />
        <Route path="/emplo-dash/post_job" element={<Postjob />} />
        <Route path="/emplo-dash/my_jobs" element={<MyJobs />} />
        <Route path="/emplo-dash/bills_details" element={<PlanDetails />} />
        <Route path="/emplo-dash/settings" element={<CompanyInfo />} />
        <Route path="/emplo-dash/found-info" element={<FoundingInfo />} />
        // <Route path="/emplo-dash/company-settings" element={<CompanyInfo />} />
        <Route path="/emplo-dash/my_jobs/:id/all_applicants" element={<AllApplicant />} />
        <Route path="/emplo-dash/my_jobs/:id/short_list" element={<ShortList />} />
      </Routes>
    </>
  );
};

export default Home;
