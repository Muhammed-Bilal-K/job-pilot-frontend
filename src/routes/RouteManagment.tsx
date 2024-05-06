import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../app/login/page";
import Signin from "../app/signin/page";
import Forgetform from '../components/userComponents/ForgetPage/Forgetform'
import ForgetPass from '../components/userComponents/ForgetPage/ForgetPass';
import Verification from "../components/userComponents/verification/Verification";
import EmployerRoute from "./EmployerRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AdminLogin from "../components/adminComponents/Login";
import Joblist from "../components/userComponents/JobList/Joblist";
import PrivateRouteAuth from "./ProtectRoute/PrivateComAuth";
import { JobDetails } from "../components/userComponents/JobDetails/JobDetails";
import PrivateUserAuth from "./ProtectRoute/PrivateUserAuth";
import Success from "../pages/success";
import Messanger from "../pages/messenger/Messanger";
import LobbyScreen from "../pages/meeting/Lobby";
import RoomPage from "../pages/meeting/Room";
import CompanyList from "../components/userComponents/CompanyList/Companylist";
import { EmploDetails } from "../components/userComponents/EmployerDetails/EmploDetails";
const RouteManagment: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateUserAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgetpass" element={<ForgetPass />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/forgetform" element={<Forgetform />} />
        </Route>
        <Route path="/find-job" element={<Joblist />} />
        <Route path="/find-employer" element={<CompanyList />} />
        <Route path="/find-employer/employer-details/:id" element={<EmploDetails />} />
        <Route path="/find-job/job-details/:id" element={<JobDetails />} />
        <Route element={<PrivateRouteAuth />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
        <>
          <Route path="/candidate/*" element={<UserRoute />} />
        </>
        <>
          <Route path="/employer/*" element={<EmployerRoute />} />
        </>
        <>
          <Route path="/admin/*" element={<AdminRoute />} />
        </>
        <>
          <Route path="/success" element={<Success />} />
        </>
        <>
          <Route path="/message/:id" element={<Messanger />} />
        </>
        <>
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </>
      </Routes>
    </>
  );
};

export default RouteManagment;
