import { Route, Routes } from "react-router-dom";
import Home from "../components/EmploComponents/EmploDash/Home";
import PrivateRoute from "./ProtectRoute/PrivateCompo";

export default function EmployerRoute() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute role="employer" redirect={"/"} />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
