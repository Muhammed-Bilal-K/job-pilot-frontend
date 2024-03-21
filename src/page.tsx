import Hero from "./app/home/Hero";
import { Route, Routes } from "react-router-dom";
// import PrivateCompo from "./routes/ProtectRoute/PrivateCompo";
import { RootMangament } from "./routes/Index";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route element={<PrivateCompo />}> */}
        <Route path={"/*"} element={<RootMangament />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}