import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../app/login/page";
import Signin from "../app/signin/page";
import PrivateRoute from "./ProtectRoute/PrivateCompo";
import Forgetform from "../components/userComponents/forgetpass/Forgetform";
import ForgetPass from "../components/userComponents/forgetpass/ForgetPass";
import Verification from "../components/userComponents/verification/Verification";
import EmployerRoute from "./EmployerRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AdminLogin from "../components/adminComponents/Login";
import Joblist from "../components/userComponents/Joblist/Joblist";
const RouteManagment: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgetpass" element={<ForgetPass />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/forgetform" element={<Forgetform />} />
        </Route>
        <Route path="/find-job" element={<Joblist/>} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <>
          <Route path="/candidate/*" element={<UserRoute />} />
        </>
        <>
          <Route path="/employer/*" element={<EmployerRoute />} />
        </>
        <>
          <Route path="/admin/*" element={<AdminRoute />} />
        </>
      </Routes>
    </>
  );
};

export default RouteManagment;
