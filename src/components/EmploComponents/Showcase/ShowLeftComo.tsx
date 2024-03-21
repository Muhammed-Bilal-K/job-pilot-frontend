import React from 'react';
import { Link } from 'react-router-dom';
import { RiStackLine } from 'react-icons/ri';
import { FiPlusCircle, FiBriefcase } from 'react-icons/fi';
import { FaRegBookmark, FaMoneyBillAlt } from 'react-icons/fa';

export const ShowLeftComponent: React.FC = () => {
  return (
    <>
      <div className="showcase-left">
        <div className="showcase-all">
          <p>candidate dashboard</p>
        </div>
        <div className="show-inside-left">
          <Link to="/emplo-dash" className="btn-showcase">
            <RiStackLine className="showcase-icons" /> <span className="ml-5">Overview</span>
          </Link>
          <Link to="/emplo-dash/post_job" className="btn-showcase">
            <FiPlusCircle className="showcase-icons" /> <span className="ml-5">Post Job</span>
          </Link>
          <Link to="/emplo-dash/my_jobs" className="btn-showcase">
            <FiBriefcase className="showcase-icons" /> <span className="ml-5">My Jobs</span>
          </Link>
          <Link to="/emplo-dash/favorite_candidates" className="btn-showcase">
            <FaRegBookmark className="showcase-icons" /> <span className="ml-5">Favorite Candidates</span>
          </Link>
          <Link to="/emplo-dash/bills_details" className="btn-showcase">
            <FaMoneyBillAlt className="showcase-icons" /> <span className="ml-5">Bills & Details</span>
          </Link>
        </div>
      </div>
    </>
  );
};
