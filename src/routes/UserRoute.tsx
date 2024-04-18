import { Route, Routes } from "react-router-dom";
import Home from "../components/userComponents/UserDash/Home";
import PrivateRoute from "./ProtectRoute/PrivateCompo";

export default function UserRoute() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute role="candidate" redirect="/" />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
