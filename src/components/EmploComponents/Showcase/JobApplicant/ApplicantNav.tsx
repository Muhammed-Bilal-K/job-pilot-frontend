import React from 'react'
import { GoPeople } from "react-icons/go";
import { Link } from 'react-router-dom'
import { AiOutlineUser } from "react-icons/ai";

interface ApplicantNavProps {
  JobId: string | undefined;
}

const ApplicantNav: React.FC<ApplicantNavProps> = ({ JobId }) => {
  return (
    <>
      <div className="font-semibold text-2xl pl-2">All Applicants</div>
      <div>
        <div className="flex items-center content-start mt-3 border-b-2">
          <Link to={`/employer/emplo-dash/my_jobs/${JobId}/all_applicants`} className="">
            <div className="flex items-center px-7 py-3 btn-over-sett">
              <div>
                <GoPeople className="showcase-icons" />
              </div>
              <div>
                <span className="ml-5">All Applicants</span>
              </div>
            </div>
          </Link>
          <Link to={`/employer/emplo-dash/my_jobs/${JobId}/short_list`} className="">
            <div className="flex items-center px-7 py-3 btn-over-sett">
              <div>
                <AiOutlineUser className="showcase-icons" />
              </div>
              <div>
                <span className="ml-5">Shortlisted</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ApplicantNav;
