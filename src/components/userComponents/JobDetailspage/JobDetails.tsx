import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { CiCalendar } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import {
  ListAllJobApplicant,
  ListAllJobs,
  applyForJob,
  currentUser,
} from "../../../apis/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../app/utilities/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { LoginInSuccess } from "../../../redux/slices/user.slice";
import { message } from "antd";
import { GetSpecificUser } from "../../../apis/user";
import { FaRegMap } from "react-icons/fa";

interface CheckAbleApply {
  resumeUrl: string;
}

export const JobDetails: React.FC = () => {
  const storage = getStorage(app);
  const dispatch = useDispatch();

  // const [userInfo, setUserInfo] = useState<any>({});
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [defaultPdf, setDefaultPdf] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const [specificJob, setSpecificJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [candidate, setCandidate] = useState<string>("");
  const [JobCheck, setJobCheck] = useState<any>([]);

  const [checkAbleApply, setCheckAbleApply] = useState<
    CheckAbleApply | undefined
  >(undefined);

  const User: any = useSelector((state: RootState) => {
    return state.user.currentUser;
  });
  console.log(User);

  const HandleNotLogin = () => {
    message.info("Need to login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await GetSpecificUser(User._id);
      console.log(response.user);
      setCheckAbleApply(response.user);
    };
    fetchUser();
  }, [User]);

  useEffect(() => {
    if (User) {
      setCandidate(User?.fullname);
    }
  }, [User]);

  useEffect(() => {
    const fetchData = async () => {
      if (User?._id) {
        const response = await GetSpecificUser(User._id);
        if (response.user) {
          console.log(response.user);
          // setUserInfo(response.user);
          setDefaultPdf(response.user.resumeUrl);
        }
      }
    };

    fetchData();
  }, [User?._id]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && !candidate) {
      const fetchUserData = async (token: string) => {
        try {
          const user = await currentUser(token);
          console.log(user.data.currentUser);
          dispatch(LoginInSuccess(user.data.currentUser));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(token);
    }
  }, [User]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  console.log(isChecked);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await ListAllJobs({}, 0);
        console.log(res.jobs);

        const jobArray = res.jobs;
        const job = jobArray.find((job: any) => job._id === id);
        console.log(job);
        setSpecificJob(job);

        const response = await ListAllJobApplicant();
        console.log(response.data.jobs);
        if (response.data.jobs) {
          const Applicant = response.data.jobs;
          const AppliedJobCheck = Applicant.filter(
            (job: any) => job.user === User?._id
          );
          setJobCheck(AppliedJobCheck);
          console.log(AppliedJobCheck);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [id, User?._id]);

  const handleApply = () => {
    if (checkAbleApply?.resumeUrl === '') {
      message.warning("you should need to fill information first goto settings --> user Info!");
      return;
    }

    setIsModalOpen(true);
  };

  if (!specificJob) {
    return (
      <>
        <span className="sr-only">Loading...</span>
      </>
    );
  }

  const {
    company: { companyname, logo },
    jobTitle,
    jobDescription,
    minSalary,
    maxSalary,
    country,
    state,
    expiredate,
    jobtype,
    createdAt,
    joblevel,
    experience,
    education,
  } = specificJob;
  const createdAtDate = new Date(createdAt);
  const formattedCreatedAt = `${createdAtDate.getDate()}/${
    createdAtDate.getMonth() + 1
  }/${createdAtDate.getFullYear()}`;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log(file, "data");

    if (file) {
      const fileType = file.type;
      if (fileType === "application/pdf") {
        setSelectedFile(file);
        setFileError("");
        console.log("Selected file:", file.name);
      } else {
        setSelectedFile(null);
        setFileError("Please select a PDF file.");
        console.log("Please select a PDF file.");
      }
    }
  };

  const handleCoverLetterChange = (e: any) => {
    setCoverLetter(e.target.value);
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(specificJob._id);
    console.log(User._id);
    
    if (User._id === '' || specificJob._id === '' || coverLetter === '') {
      message.info('complete all details!');
      return
    }

    if (isChecked && defaultPdf) {
      message.open({
        type: "loading",
        content: "Action in progress..",
        duration: 2,
      });

      // If isChecked is true and defaultPdf exists, pass defaultPdf to the backend
      try {
        const job = await applyForJob({
          resumeURL: defaultPdf,
          coverLetter: coverLetter,
          jobId: specificJob._id,
          userId: User._id,
        });
        console.log(job);
        if (job.message === "job applied successfull.") {
          message.success("Job Applied Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
        setIsModalOpen(false);
        setSelectedFile(null);
        setCoverLetter("");
      } catch (error) {
        console.error("Error applying for job:", error);
      }
    } else {
      if (!selectedFile) {
        return;
      }

      message.open({
        type: "loading",
        content: "Action in progress..",
        duration: 3,
      });
      // If isChecked is false or defaultPdf doesn't exist, upload the selected file
      const storageRef = ref(storage, `resumes/${selectedFile.name}`);
      try {
        await uploadBytes(storageRef, selectedFile);

        const downloadURL = await getDownloadURL(storageRef);

        const job = await applyForJob({
          resumeURL: downloadURL,
          coverLetter: coverLetter,
          jobId: specificJob._id,
          userId: User._id,
        });

        console.log(job);

        if (job.message === "job applied successfull.") {
          message.success("Job Applied Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
        setIsModalOpen(false);
        setSelectedFile(null);
        setCoverLetter("");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  //   return (
  //     <>
  //       <Navbar />
  //       <div className="job-Show">
  //         <div className="job-show-left">
  //           <h1>Job Details</h1>
  //         </div>
  //         <div className="job-show-right">
  //           Home/ Find Job/ {jobTitle}/ Job Details
  //         </div>
  //       </div>
  //       <div className="full-cover-job-detail">
  //         <div className="job-detail-full-head">
  //           <div className="job-detail-imgcmp-info">
  //             <div className="job-detail-image">
  //               <img
  //                 className="rounded-full w-36 "
  //                 src={logo}
  //                 alt="company profile"
  //               />
  //             </div>
  //             <div>
  //               <div className="company-main">
  //                 <h5 className="capitalize text-2xl">{jobTitle}</h5>
  //               </div>
  //               <div className="company-main">
  //                 at{" "}
  //                 <h5 className="inline capitalize mr-1 text-base">
  //                   {companyname}
  //                 </h5>{" "}
  //                 <p
  //                   className="inline text-white px-3 py-1 capitalize rounded-md"
  //                   style={{ backgroundColor: "#0BA02C" }}
  //                 >
  //                   {jobtype}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="job-detail-apply text-center items-center">
  //             <div>
  //               <p
  //                 className="p-2.5 mr-3 text-2xl"
  //                 style={{ backgroundColor: "#e7f0fa" }}
  //               >
  //                 <CiBookmark />
  //               </p>
  //             </div>

  //             <>
  //               {specificJob && (
  //                 <div>
  //                   {User ? (
  //                     JobCheck.some(
  //                       (application: any) => application.job === specificJob._id
  //                     ) ? (
  //                       <button className="job-apply-btn text-white" disabled>
  //                         Already Applied
  //                       </button>
  //                     ) : (
  //                       <button
  //                         className="job-apply-btn text-white"
  //                         onClick={handleApply}
  //                       >
  //                         Apply Now <span className="text"> &#8594;</span>
  //                       </button>
  //                     )
  //                   ) : (
  //                     <button onClick={HandleNotLogin} className="job-apply-btn text-white">
  //                       Apply Now <span className="text"> &#8594;</span>
  //                     </button>
  //                   )}
  //                 </div>
  //               )}
  //             </>
  //           </div>
  //         </div>
  //         <div className="job-desc-full mt-10">
  //           <div className="job-description">
  //             <h2 className="job-desc-req">Job Description</h2>
  //             <p>
  //               {jobDescription}
  //               Velstar is a Shopify Plus agency, and we partner with brands to
  //               help them grow, we also do the same with our people! help them
  //               grow, we also do the same with our people! help them grow, we also
  //               do the same with our people! help them grow, we also do the same
  //               with our people!
  //             </p>
  //             <h2 className="job-desc-req">Job Requirements</h2>
  //             <p>
  //               Velstar is a Shopify Plus agency, and we partner with brands to
  //               help them grow, we also do the same with our people! help them
  //               grow, we also do the same with our people! help them grow, we also
  //               do the same with our people! help them grow, we also do the same
  //               with our people!
  //             </p>
  //           </div>
  //           <div className="salary-location-overview w-full">
  //             <div className="salary-location">
  //               <div className="firs-left-part">
  //                 <div className="salary-inr font-semibold capitalize">
  //                   <p>Salary (USD)</p>
  //                   <p
  //                     className="text-green-700 text-xl"
  //                     style={{ fontWeight: "600" }}
  //                   >
  //                     ${minSalary},00-${maxSalary},00
  //                   </p>
  //                   <p>yearly salary</p>
  //                 </div>
  //                 <div className="salary-loca-only flex flex-col justify-center items-center font-semibold capitalize">
  //                   <FaRegMap fontSize="30px" className="text-blue-500"/>
  //                   <h5>Job Location</h5>
  //                   <p>
  //                     {country} , {state}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="border-gray-300 border px-6 py-6 mt-5">
  //               <h4 className="mb-3 font-medium">Job Overview</h4>
  //               <div
  //                 className="grid grid-cols-2 md:grid-cols-3 gap-4 capitalize"
  //                 style={{ fontWeight: "500", fontSize: "15px" }}
  //               >
  //                 <div>
  //                   <CiCalendar />
  //                   <p className="mt-2">job posted</p>
  //                   <p style={{ color: "#888a89fa" }}>{formattedCreatedAt}</p>
  //                 </div>
  //                 <div>
  //                   <CiCalendar />
  //                   <p className="mt-2">job expire in</p>
  //                   <p style={{ color: "#888a89fa" }}>{expiredate}</p>
  //                 </div>
  //                 <div>
  //                   <CiCalendar />
  //                   <p className="mt-2">job level</p>
  //                   <p style={{ color: "#888a89fa" }}>{joblevel}</p>
  //                 </div>
  //                 <div>
  //                   <CiCalendar />
  //                   <p className="mt-2">experience(year)</p>
  //                   <p style={{ color: "#888a89fa" }}>{experience} experience</p>
  //                 </div>
  //                 <div>
  //                   <CiCalendar />
  //                   <p className="mt-2">education</p>
  //                   <p style={{ color: "#888a89fa" }}>{education}</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       {/* Modal */}
  //       {isModalOpen && (
  //         <div
  //           id="crud-modal"
  //           tabIndex={-1}
  //           aria-hidden="true"
  //           className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen bg-black bg-opacity-50 dark:bg-opacity-50"
  //         >
  //           <div className="relative p-4 w-full max-w-md max-h-full">
  //             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
  //               {/* Modal header */}
  //               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
  //                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
  //                   Apply for {jobTitle}
  //                 </h3>
  //                 <button
  //                   type="button"
  //                   onClick={() => setIsModalOpen(false)}
  //                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
  //                 >
  //                   <svg
  //                     className="w-3 h-3"
  //                     aria-hidden="true"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     fill="none"
  //                     viewBox="0 0 14 14"
  //                   >
  //                     <path
  //                       stroke="currentColor"
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="2"
  //                       d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
  //                     />
  //                   </svg>
  //                   <span className="sr-only">Close modal</span>
  //                 </button>
  //               </div>
  //               <form onSubmit={handleSubmit} className="p-4 md:p-5">
  //                 <div className="grid gap-4 mb-4">
  //                   <div>
  //                     <div className="mb-2">
  //                       <input
  //                         type="checkbox"
  //                         placeholder="use default resume"
  //                         checked={isChecked}
  //                         onChange={handleCheckboxChange}
  //                       />
  //                       <label
  //                         className="text-white inline ml-2"
  //                         htmlFor="useDefaultResume"
  //                       >
  //                         Use default resume
  //                       </label>
  //                     </div>

  //                     <div>
  //                       {isChecked ? (
  //                         <>
  //                           <label
  //                             htmlFor="resume"
  //                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //                           >
  //                             Upload Resume
  //                           </label>
  //                           <input
  //                             style={{ opacity: "0.5" }}
  //                             type="file"
  //                             disabled
  //                             id="resume"
  //                             name="resume"
  //                             accept=".pdf"
  //                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  //                           />
  //                         </>
  //                       ) : (
  //                         <>
  //                           <label
  //                             htmlFor="resume"
  //                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //                           >
  //                             Upload Resume
  //                           </label>
  //                           <input
  //                             type="file"
  //                             id="resume"
  //                             name="resume"
  //                             accept=".pdf"
  //                             onChange={handleFileSelect}
  //                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  //                             required
  //                           />
  //                         </>
  //                       )}
  //                     </div>
  //                     {fileError && <p className="text-red-500">{fileError}</p>}
  //                   </div>
  //                   <div>
  //                     <label
  //                       htmlFor="message"
  //                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //                     >
  //                       Cover letter (Optional)
  //                     </label>
  //                     <textarea
  //                       id="message"
  //                       rows={4}
  //                       value={coverLetter}
  //                       onChange={handleCoverLetterChange}
  //                       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //                       placeholder="Write your message here"
  //                     ></textarea>
  //                   </div>
  //                 </div>

  //                 <button
  //                   type="submit"
  //                   disabled={!selectedFile && !isChecked}
  //                   className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
  //                     !selectedFile && !isChecked ? "cursor-not-allowed" : ""
  //                   }`}
  //                 >
  //                   <svg
  //                     className="me-1 -ms-1 w-5 h-5"
  //                     fill="currentColor"
  //                     viewBox="0 0 20 20"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
  //                       clipRule="evenodd"
  //                     ></path>
  //                   </svg>
  //                   Apply
  //                 </button>
  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      <Navbar />
      <div className="job-Show">
        <div className="job-show-left">
          <h1 className="text-xl md:text-2xl lg:text-md">Job Details</h1>
        </div>
        <div className="job-show-right text-sm md:text-base lg:text-md">
          Home/ Find Job/ {jobTitle}/ Job Details
        </div>
      </div>
      <div className="full-cover-job-detail p-4 md:px-40 lg:px-40">
        <div className="job-detail-full-head grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="job-detail-imgcmp-info flex flex-col md:flex-row items-center">
            <div className="job-detail-image">
              <img
                className="rounded-full w-24 md:w-36"
                src={logo}
                alt="company profile"
              />
            </div>
            <div className="ml-4">
              <div className="company-main">
                <h5 className="capitalize text-xl md:text-2xl lg:text-2xl">
                  {jobTitle}
                </h5>
              </div>
              <div className="company-main mt-1">
                at{" "}
                <h5 className="inline capitalize mr-1 text-base md:text-lg">
                  {companyname}
                </h5>{" "}
                <p
                  className="inline text-white px-3 py-1 capitalize rounded-md"
                  style={{ backgroundColor: "#0BA02C" }}
                >
                  {jobtype}
                </p>
              </div>
            </div>
          </div>
          <div className="job-detail-apply text-center">
            <div>
              <p
                className="p-2.5 mr-3 text-xl md:text-2xl"
                style={{ backgroundColor: "#e7f0fa" }}
              >
                <CiBookmark />
              </p>
            </div>
            <>
              {specificJob && (
                <div>
                  {User ? (
                    JobCheck.some(
                      (application: any) => application.job === specificJob._id
                    ) ? (
                      <button
                        className="job-apply-btn text-white bg-gray-400 cursor-not-allowed"
                        disabled
                      >
                        Already Applied
                      </button>
                    ) : (
                      <button
                        className="job-apply-btn text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                        onClick={handleApply}
                      >
                        Apply Now <span className="text"> &#8594;</span>
                      </button>
                    )
                  ) : (
                    <button
                      onClick={HandleNotLogin}
                      className="px-20 py-2 sm:p-2 md:py-2 lg:px-20 lg:py-2  text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                    >
                      Apply Now <span className="text"> &#8594;</span>
                    </button>
                  )}
                </div>
              )}
            </>
          </div>
        </div>
        <div className="job-desc-full mt-10">
          <div className="job-description">
            <h2 className="job-desc-req text-xl md:text-base lg:text-1xl">
              Job Description
            </h2>
            <p className="text-sm md:text-base lg:text-lg">{jobDescription}</p>
            <h2 className="job-desc-req text-xl md:text-base lg:text-1xl mt-4">
              Job Requirements
            </h2>
            <p className="text-sm md:text-base lg:text-lg">
              Velstar is a Shopify Plus agency, and we partner with brands to
              help them grow, we also do the same with our people! help them
              grow, we also do the same with our people! help them grow, we also
              do the same with our people! help them grow, we also do the same
              with our people!
            </p>
          </div>
          <div className="salary-location-overview mt-6 md:mt-8 lg:mt-10 w-full">
            <div className="salary-location flex flex-col md:flex-row justify-between">
              <div className="firs-left-part flex flex-col md:flex-row">
                <div className="salary-inr font-semibold capitalize">
                  <p>Salary (USD)</p>
                  <p
                    className="text-green-700 text-lg md:text-xl lg:text-2xl"
                    style={{ fontWeight: "600" }}
                  >
                    ${minSalary},00-${maxSalary},00
                  </p>
                  <p>yearly salary</p>
                </div>
                <div className="salary-loca-only flex flex-col items-center md:items-start font-semibold capitalize mt-4 md:mt-0">
                  <FaRegMap fontSize="30px" className="text-blue-500" />
                  <h5 className="text-lg md:text-xl lg:text-1xl mt-2">
                    Job Location
                  </h5>
                  <p className="text-sm md:text-base lg:text-base">
                    {country}, {state}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-gray-300 px-4 py-4 mt-5 md:px-6 md:py-6 lg:px-8 lg:py-8 border rounded">
              <h4 className="mb-3 font-medium text-lg md:text-xl lg:text-2xl">
                Job Overview
              </h4>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 capitalize text-sm md:text-base lg:text-lg"
                style={{ fontWeight: "500" }}
              >
                <div>
                  <CiCalendar />
                  <p className="mt-2">job posted</p>
                  <p className="text-gray-500">{formattedCreatedAt}</p>
                </div>
                <div>
                  <CiCalendar />
                  <p className="mt-2">job expire in</p>
                  <p className="text-gray-500">{expiredate}</p>
                </div>
                <div>
                  <CiCalendar />
                  <p className="mt-2">job level</p>
                  <p className="text-gray-500">{joblevel}</p>
                </div>
                <div>
                  <CiCalendar />
                  <p className="mt-2">experience(year)</p>
                  <p className="text-gray-500">{experience} experience</p>
                </div>
                <div>
                  <CiCalendar />
                  <p className="mt-2">education</p>
                  <p className="text-gray-500">{education}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen bg-black bg-opacity-50 dark:bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Apply for {jobTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id="useDefaultResume"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label
                        className="text-gray-900 dark:text-white"
                        htmlFor="useDefaultResume"
                      >
                        Use default resume
                      </label>
                    </div>
                    <div>
                      {isChecked ? (
                        <>
                          <label
                            htmlFor="resume"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Upload Resume
                          </label>
                          <input
                            style={{ opacity: "0.5" }}
                            type="file"
                            disabled
                            id="resume"
                            name="resume"
                            accept=".pdf"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </>
                      ) : (
                        <>
                          <label
                            htmlFor="resume"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Upload Resume
                          </label>
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required
                          />
                        </>
                      )}
                    </div>
                    {fileError && <p className="text-red-500">{fileError}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Cover letter (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={coverLetter}
                      onChange={handleCoverLetterChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your message here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!selectedFile && !isChecked}
                  className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                    !selectedFile && !isChecked ? "cursor-not-allowed" : ""
                  }`}
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Apply
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
