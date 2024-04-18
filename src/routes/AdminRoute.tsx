import { Route, Routes } from "react-router-dom";
import Home from "../components/adminComponents/adminDash/Home";
import PrivateRoute from "./ProtectRoute/PrivateCompo";

export default function AdminRoute() {
    return (
        <div>
            <Routes>
                <Route element={<PrivateRoute role='admin' redirect={'/admin/login'} />}>
                    <Route path="/*" element={<Home />} />
                </Route>
            </Routes>
        </div>
    )
}