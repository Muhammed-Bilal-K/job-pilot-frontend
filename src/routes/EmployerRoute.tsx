import { Route, Routes } from "react-router-dom";
import Home from "../components/EmploComponents/EmploDash/Home";

export default function EmployerRoute() {
    return (
        <div>
            <Routes>
                    <Route path="/*" element={<Home />} />
            </Routes>
        </div>
    )
}
