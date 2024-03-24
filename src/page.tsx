import Hero from "./app/home/Hero";
import { Route, Routes } from "react-router-dom";
import { RootMangament } from "./routes/Index";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path={"/*"} element={<RootMangament />} />
      </Routes>
    </>
  );
}