import React, { useEffect, useState } from "react";
import { ShowLeftComponent } from "../Showcase/ShowLeftComo";
import { ParticularUser, currentUser } from "../../../apis/auth";
import { LoginInSuccess } from "../../../redux/slices/user.slice";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppliedJob: React.FC = () => {
  const navigate = useNavigate();
  const [job, setJobs] = useState<
    {
      shortlisted: string;
      job: {
        _id: any;
        company: any;
        country: string;
        minSalary: string;
        companylogo: string;
        jobTitle: string;
      };
      createdAt: string;
      status: string;}[]>([]);
  const [candidate, setCandidate] = useState("");
  const dispatch = useDispatch();
  const User: any = useSelector((state: RootState) => {
    return state.user.currentUser;
  });
  console.log(User);

  useEffect(() => {
    if (User) {
      setCandidate(User?.fullname);
      console.log(User?.fullname);
    }
  }, [candidate]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && !candidate) {
      const fetchUserData = async (token: string) => {
        try {
          const user = await currentUser(token);
          dispatch(LoginInSuccess(user.data.currentUser));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(token);
    }
  }, [candidate]);

  function handleViewDetails(id: string) {
    console.log(id);
    navigate(`/find-job/job-details/${id}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      const user = await ParticularUser(User?._id);
      console.log(user.jobs);
      setJobs(user.jobs);
    };
    fetchData();
  }, [User?._id]);

  console.log(job);
  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <h2 className="pb-5">Applied Jobs</h2>
        <table className="w-full">
          <thead style={{ backgroundColor: "#F2F2F2" }}>
            <tr>
              <th className="px-3 py-3">Job Title</th>
              <th className="px-3 py-3">Date Applied</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Options</th>
            </tr>
          </thead>
          <tbody>
            {job.map((job, index) => (
              <tr key={index}>
                <td className="px-3 py-3">
                  <div className="flex items-center space-x-4">
                    <div>
                      <img
                        className="w-24 rounded-lg"
                        src={job.job ? job.job.company.logo : ""}
                        alt="compImg"
                      />
                    </div>
                    <div>
                      <div>
                        <h4>{job.job ? job.job.jobTitle : ""}</h4>
                      </div>
                      <div>
                        <p>
                          {job.job ? job.job.country : ""},{" "}
                          {job.job ? job.job.minSalary : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-center">
                    <p>
                      {new Date(job.createdAt).toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-center">
                      {
                        job.shortlisted ? 
                        <p className="text-green-700">ShortListed</p> : <p className="text-blue-600">Pending</p>
                      }
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="bg-aliceblue p-4 text-black text-base font-medium rounded-xl bottom-0"
                      style={{ backgroundColor: "#E7F0FA" }}
                      onClick={() => handleViewDetails(job.job._id)}
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJob;
