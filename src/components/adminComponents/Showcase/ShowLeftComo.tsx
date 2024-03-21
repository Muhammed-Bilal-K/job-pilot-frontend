import React from 'react';
import { Link } from 'react-router-dom';
import { RiStackLine } from 'react-icons/ri';
import { FiBriefcase } from 'react-icons/fi';
import { BsBuildings } from 'react-icons/bs';
import { FaMoneyBillAlt } from 'react-icons/fa';

export const ShowLeftComponent: React.FC = () => {
  return (
    <>
      <div className="showcase-left">
        <div className="showcase-all">
          <p>admin dashboard</p>
        </div>
        <div className="show-inside-left">
          <Link to="/admin/admin-dash" className="btn-showcase">
            <RiStackLine className="showcase-icons" /> <span className="ml-5">Overview</span>
          </Link>
          <Link to="/admin/admin-dash/candidate_list" className="btn-showcase">
          <FiBriefcase className="showcase-icons" /> 
            <span className="ml-5">Candidates</span>
          </Link>
          <Link to="/admin/admin-dash/employer_list" className="btn-showcase">
            <BsBuildings className="showcase-icons" /> 
            <span className="ml-5">Employers</span>
          </Link>
          <Link to="/admin/admin-dash/bills_details" className="btn-showcase">
            <FaMoneyBillAlt className="showcase-icons" /> <span className="ml-5">Bills & Details</span>
          </Link>
        </div>
      </div>
    </>
  );
};
