// import React, { useEffect, useState } from "react";
// import { FaRegBookmark } from "react-icons/fa";
// import { IoLocationOutline } from "react-icons/io5";
// import { ListAllJobs } from "../../apis/auth";
// import { useNavigate } from "react-router-dom";

// interface Job {
//   _id: string;
//   company?: { companyname: string; logo: string };
//   jobTitle: string;
//   jobtype: string;
//   minSalary: string;
//   maxSalary: string;
//   country: string;
//   state: string;
//   companylogo: string;
// }

// const PopularJobs: React.FC = () => {
// const navigate = useNavigate();
//   const [joblist, setJoblist] = useState<Job[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await ListAllJobs({}, 0);

//         console.log(res.jobs);
//         setJoblist(res.jobs);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleClick = (job: any) => {
//     console.log(job);

//     console.log(job._id);
//     navigate(`/find-job/job-details/${job._id}`);
//   };

//   return (
//     <>
//       <div className="px-40 py-5">
//         <h3 className="font-bold mt-10 text-3xl">Featured Jobs</h3>
//         <div className="job-list mt-10" style={{ padding: "40px 0px" }}>
//           {joblist.map((job, index) => (
//             <div
//               className="job-box flex items-end"
//               style={{ justifyContent: "space-between" }}
//               key={index}
//             >
//               <div className="cursor-pointer" onClick={() => handleClick(job)}>
//                 <h3 className="capitalize">{job.jobTitle}</h3>
//                 <div className="job-box-type-amount">
//                   <p className="uppercase">{job.jobtype}</p>
//                   <p className="salary-nego">
//                     Salary: ${job.minSalary} - ${job.maxSalary}
//                   </p>
//                 </div>
//                 <div className="job-box-logo-loca">
//                   <img
//                     className="img-size-data"
//                     src={job.company ? job.company.logo : ""}
//                     alt="Company Logo"
//                   />
//                   <p>
//                     {job.company ? (
//                       <p className="company-bold">{job.company.companyname}</p>
//                     ) : (
//                       <p className="company-bold">company</p>
//                     )}
//                     <p className="location-change flex justify-center items-center gap-1">
//                       {" "}
//                       <IoLocationOutline /> {job.state}, {job.country}
//                     </p>
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <span>
//                   <FaRegBookmark
//                     className="cursor-pointer"
//                     // onClick={() => {
//                     //   HandleFaovriteJobs(job._id);
//                     // }}
//                   />
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PopularJobs;


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
        setJoblist(res.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (job: any) => {
    navigate(`/find-job/job-details/${job._id}`);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-40 py-5">
      <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl">Featured Jobs</h3>
      <div className="mt-6 sm:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {joblist.map((job, index) => (
            <div
              className="flex flex-col bg-white shadow-md rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleClick(job)}
              key={index}
            >
              <h3 className="text-lg font-semibold uppercase">{job.jobTitle}</h3>
              <div className="mt-1 mb-3 flex gap-3">
                <p className="text-base rounded-lg text-green-700 uppercase bg-green-200 px-2 py-1">{job.jobtype}</p>
                <p className="text-sm text-gray-600 capitalize px-1 py-1">
                  Salary: ${job.minSalary} - ${job.maxSalary}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 mr-2 rounded-xl"
                  src={job.company ? job.company.logo : ""}
                  alt="Company Logo"
                />
                <div>
                  <p className="font-semibold">{job.company ? job.company.companyname : "Company"}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <IoLocationOutline /> {job.state}, {job.country}
                  </p>
                </div>
                </div>
                <div className="flex justify-end">
                  <FaRegBookmark
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  />
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularJobs;
