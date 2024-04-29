import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { ListAllJobs } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

interface Job {
  _id: string;
  company?: { companyname: string; logo: string };
  jobTitle: string;
  jobtype: string;
  minSalary: string;
  maxSalary: string;
  country: string;
  state: string;
  companylogo: string;
}

const PopularJobs: React.FC = () => {
const navigate = useNavigate();
  const [joblist, setJoblist] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ListAllJobs({}, 0);

        console.log(res.jobs);
        setJoblist(res.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (job: any) => {
    console.log(job);

    console.log(job._id);
    navigate(`/find-job/job-details/${job._id}`);
  };

  return (
    <>
      <div className="px-40 py-5">
        <h3 className="font-bold mt-10 text-3xl">Featured Jobs</h3>
        <div className="job-list mt-10" style={{ padding: "40px 0px" }}>
          {joblist.map((job, index) => (
            <div
              className="job-box flex items-end"
              style={{ justifyContent: "space-between" }}
              key={index}
            >
              <div className="cursor-pointer" onClick={() => handleClick(job)}>
                <h3 className="capitalize">{job.jobTitle}</h3>
                <div className="job-box-type-amount">
                  <p className="uppercase">{job.jobtype}</p>
                  <p className="salary-nego">
                    Salary: ${job.minSalary} - ${job.maxSalary}
                  </p>
                </div>
                <div className="job-box-logo-loca">
                  <img
                    className="img-size-data"
                    src={job.company ? job.company.logo : ""}
                    alt="Company Logo"
                  />
                  <p>
                    {job.company ? (
                      <p className="company-bold">{job.company.companyname}</p>
                    ) : (
                      <p className="company-bold">company</p>
                    )}
                    <p className="location-change flex justify-center items-center gap-1">
                      {" "}
                      <IoLocationOutline /> {job.state}, {job.country}
                    </p>
                  </p>
                </div>
              </div>
              <div>
                <span>
                  <FaRegBookmark
                    className="cursor-pointer"
                    // onClick={() => {
                    //   HandleFaovriteJobs(job._id);
                    // }}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularJobs;
