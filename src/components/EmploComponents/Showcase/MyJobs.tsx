import React, { useEffect, useState } from "react";
import { ShowLeftComponent } from "./ShowLeftComo";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EmployerSpecificJobs } from "../../../apis/job";
import { IoLocationOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const MyJobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const Employer: any = useSelector((state: RootState) => {
    return state.employer.currentEmployer;
  });
  console.log(Employer);

  const handleViewApplications = (id: string) => {
    console.log(id);
    navigate(`${id}/all_applicants`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await EmployerSpecificJobs(Employer?.email);
      console.log(res.jobs);

      setJobs(res.jobs);
    };
    fetchData();
  }, []);

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <div className="">
          <h1>My Jobs</h1>
          <table className="employers-table">
            <thead>
              <tr>
                <th>Jobs</th>
                <th>Applications</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index}>
                  <td>
                    <div>
                      <div className="mb-2">
                        <p className="font-semibold">{job.jobTitle}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          <IoLocationOutline className="text-yellow-600" />
                          <p className="font-medium">{job.country}</p>
                        </div>
                        <div className="flex items-center">
                          <BsCurrencyDollar className="text-yellow-600" />
                          <p className="font-medium">
                            {job.minSalary} - {job.maxSalary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{job.applicationNo}</td>
                  <td>
                    {new Date(job.expiredate) > new Date() ? (
                      <p className="text-green-500 font-medium">Active</p>
                    ) : (
                      <p className="text-red-500 font-medium">Expired</p>
                    )}
                  </td>
                  <td>
                    <button
                      className="view-applications-btn px-5 py-2 rounded-lg"
                      style={{ backgroundColor: "#E7F0FA" }}
                      onClick={() => handleViewApplications(job._id)}
                    >
                      View Applicants
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
