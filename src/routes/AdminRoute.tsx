import { Route, Routes } from "react-router-dom";
import Home from "../components/adminComponents/adminDash/Home";

export default function AdminRoute() {
    return (
        <div>
            <Routes>
                    <Route path="/*" element={<Home />} />
            </Routes>
        </div>
    )
}