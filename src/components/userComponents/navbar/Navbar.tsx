import React from "react";
import logoPilot from '../../../assets/Logo.png';
import profilePic from '../../../assets/Ellipse 18.png';
import bellIcons from '../../../assets/BellRinging.png';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const token : string | null = localStorage.getItem("Token");
  return (
    <>
    <div className="navbar">
      <div className="left-sections">
        <Link to='/'> Home</Link>
        <Link to="/find-job">Find Job</Link>
        <Link to="/employers">Employers</Link>
      </div>
      <div className="right-sections">
        <div className="contact-number">+1-23-232323</div>
        <div className="language-select">English</div>
      </div>
    </div>
    <div className="logo-navbar">
      <div className="logo">
        <img src={logoPilot} alt="logoofjobpilot" className="w-28" />
      </div>
      {
        token ? <div className="border-none verify">
          <img src={bellIcons} alt="" className="bell-class"/>
          <img src={profilePic } alt="" />
        </div> : <div className="signin">
        <button><Link to="/signin">Sign In</Link></button>
      </div>
      }
    </div>
    </>
  );
};

export default Navbar;
