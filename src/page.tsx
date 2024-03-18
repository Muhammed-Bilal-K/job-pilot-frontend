import Login from "./app/login/page";
import Signin from "./app/signin/page";
import Hero from "./app/home/Hero";
import ForgetPass from "./components/forgetpass/ForgetPass";
import Forgetform from "./components/forgetpass/Forgetform";
import Verification from "./components/verification/Verification";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
      <>
      <Routes>
        <Route path="/" element={< Hero />}/>
        <Route path="/login" element={< Login />}/>
        <Route path="/signin" element={< Signin />}/>
        <Route path="/forgetpass" element={< ForgetPass />}/>
        <Route path="/verification" element={< Verification />}/>
        <Route path="/forgetform" element={< Forgetform />}/>
      </Routes>
      </>
  )
}