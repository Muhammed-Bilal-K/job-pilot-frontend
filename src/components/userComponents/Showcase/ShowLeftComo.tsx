import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiStackLine } from 'react-icons/ri';
import { CiBookmark } from "react-icons/ci";
import { FiBriefcase } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';

export const ShowLeftComponent: React.FC = () => {
  const navigate = useNavigate();
  const LogoutFunction = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <div className="showcase-left">
        <div className="showcase-all">
          <p>candidate dashboard</p>
        </div>
        <div className="show-inside-left">
          <Link to="/candidate/user-dash" className="btn-showcase">
            <RiStackLine className="showcase-icons" /> <span className="ml-5">Overview</span>
          </Link>
          <Link to="/candidate/user-dash/applied_jobs" className="btn-showcase">
            <FiBriefcase className="showcase-icons" /> <span className="ml-5">Applied Job</span>
          </Link>
          <Link to="/candidate/user-dash/favorite_jobs" className="btn-showcase">
            <CiBookmark className="showcase-icons" /> <span className="ml-5">Favorite Jobs</span>
          </Link>
          <Link to="/candidate/user-dash/settings" className="btn-showcase">
            <IoMdSettings className="showcase-icons" /> <span className="ml-5">Settings</span>
          </Link>
          <p className="ml-60 mt-24">
            <span className="text-red-800 cursor-pointer" onClick={LogoutFunction}>Logout</span>
          </p>
        </div>
      </div>
    </>
  );
};
