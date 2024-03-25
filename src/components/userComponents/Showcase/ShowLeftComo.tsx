import React from 'react';
import { Link } from 'react-router-dom';
import { RiStackLine } from 'react-icons/ri';
import { FiPlusCircle, FiBriefcase } from 'react-icons/fi';

export const ShowLeftComponent: React.FC = () => {
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
            <FiPlusCircle className="showcase-icons" /> <span className="ml-5">Applied Job</span>
          </Link>
          <Link to="/candidate/user-dash/favorite_jobs" className="btn-showcase">
            <FiBriefcase className="showcase-icons" /> <span className="ml-5">Favorite Jobs</span>
          </Link>
        </div>
      </div>
    </>
  );
};
