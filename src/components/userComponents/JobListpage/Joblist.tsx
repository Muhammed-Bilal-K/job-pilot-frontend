import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import JobFilter from "./JobFilter";
import { FaRegBookmark } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { ListAllJobs, currentUser } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import { MakeFavoriteJob, PreferredJobs } from "../../../apis/job";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LoginInSuccess } from "../../../redux/slices/user.slice";
import { message } from "antd";
import { GetSpecificUser } from "../../../apis/user";
import { MdTune } from "react-icons/md";
import Pagination from "../Pagination/Pagination";

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

const JobList: React.FC = () => {
  const [preferedJobList, SetPreferedJobList] = useState<string | null>(null);
  const [candidate, setCandidate] = useState<string>("");
  const [cId, setCId] = useState<string>("");
  const dispatch = useDispatch();
  const User: any = useSelector((state: RootState) => {
    return state.user.currentUser;
  });
  useEffect(() => {
    if (User) {
      setCandidate(User.fullname);
      setCId(User._id);
    }
  }, [candidate, User]);

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

  const navigate = useNavigate();
  const [searchApplied, setSearchApplied] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [joblist, setJoblist] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [jobDiffFilter, setJobDiffFilter] = useState<any>({});

  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string[]>([]);

  const [arrayNavCount, setArrayNavCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleIndustryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedIndustry((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleSalaryRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedSalaryRange(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSort(event.target.value);
  };

  const handleJobTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedJobType((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleFilters = () => {
    const queryParameters = {
      selectedIndustries: selectedIndustry || [],
      selectedSalaryRange: selectedSalaryRange,
      selectedJobType: selectedJobType || [],
      selectedSort: selectedSort,
    };

    setJobDiffFilter(queryParameters);
    setShowFilterModal(false);
  };

  const handleSearchTitle = (title: string) => {
    setSearchTitle(title);
  };

  const handleSearchLocation = (location: string) => {
    setSearchLocation(location);
  };

  const handleApplyFilters = () => {
    let filtered = joblist;
    if (searchTitle) {
      filtered = filtered.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    if (searchLocation) {
      filtered = filtered.filter(
        (job) =>
          job.country.toLowerCase().includes(searchLocation.toLowerCase()) ||
          job.state.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    setFilteredJobs(filtered);
    setSearchApplied(true);
  };

  useEffect(() => {
    try {
      const fetchUserAuthDetail = async () => {
        if (User?._id) {
          const respo = await GetSpecificUser(User._id);
          SetPreferedJobList(respo.user.preferredJob);
        }
      };
      fetchUserAuthDetail();
    } catch (error) {
      console.log(error);
    }
  }, [User?._id]);

  const HandlePreferredJobs = () => {
    try {
      const fetchPreferredJob = async () => {
        if (preferedJobList !== null) {
          const respo = await PreferredJobs(preferedJobList);
          setJoblist(respo.preferrefJob);
        }
      };
      fetchPreferredJob();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ListAllJobs(jobDiffFilter, currentPage);
        setArrayNavCount(res.current);
        setJoblist(res.jobs);
        setFilteredJobs(res.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [jobDiffFilter, currentPage]);

  Array.from({ length: arrayNavCount }, (_, i) => i + 1);

  const handleClick = (job: any) => {
    setSelectedJob(job);
    navigate(`/find-job/job-details/${job._id}`);
  };

  const HandleFaovriteJobs = async (id: string) => {
    const jobInfo = {
      JobId: id,
    };
    
    if (cId === '') {
      return message.info("need to signIn first");
    }

    try {
      const res = await MakeFavoriteJob(cId, jobInfo);
      message.info(res.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(selectedJob);
  return (
    <>
      <Navbar />
      <div className="job-Show">
        <div className="job-show-left">
          <h1>Find Job</h1>
        </div>
        <div className="job-show-right">Home/Find Job</div>
      </div>
      <div className="job-search-apply">
        <JobFilter
          onSearchTitle={handleSearchTitle}
          onSearchLocation={handleSearchLocation}
        />
        <div className="flex gap-3">
          <div
            style={{ backgroundColor: "#F1F2F4" }}
            className="px-5 py-2 rounded-md"
          >
            <MdTune className="inline mr-3 text-2xl" />
            <button
              className=""
              style={{ fontWeight: "600" }}
              onClick={() => setShowFilterModal(true)}
            >
              Filters
            </button>
          </div>
          <button
            style={{ backgroundColor: "#0A65CC" }}
            className="text-white px-3 py-2 text-1xl font-semibold rounded-md"
            onClick={handleApplyFilters}
          >
            Find Job
          </button>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div>
          <p
            onClick={() => {
              location.reload();
            }}
            className="px-40 py-5 hover:border-b-2 hover:border-blue-300"
          >
            Recent Jobs
          </p>
        </div>
        <div>
          <p
            onClick={HandlePreferredJobs}
            className="px-40 py-5 hover:border-b-2 hover:border-blue-300 cursor-pointer"
          >
            Prefered Jobs
          </p>
        </div>
      </div>
      <div className="job-list">
        {searchApplied
          ? filteredJobs.map((job, index) => (
              <div
                className="job-box flex items-end"
                style={{ justifyContent: "space-between" }}
                key={index}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleClick(job)}
                >
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
                        <p className="company-bold">
                          {job.company.companyname}
                        </p>
                      ) : (
                        <p>company</p>
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
                      onClick={() => {
                        HandleFaovriteJobs(job._id);
                      }}
                    />
                  </span>
                </div>
              </div>
            ))
          : joblist.map((job, index) => (
              <div
                className="job-box flex items-end"
                style={{ justifyContent: "space-between" }}
                key={index}
              >
                <div
                  className="flex flex-col rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handleClick(job)}
                >
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
                        <p className="company-bold">
                          {job.company.companyname}
                        </p>
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
                      onClick={() => {
                        HandleFaovriteJobs(job._id);
                      }}
                    />
                  </span>
                </div>
              </div>



              // <div
              //   className="flex flex-col bg-white shadow-md rounded-lg px-20 py-2 cursor-pointer hover:bg-gray-100"
              //   onClick={() => handleClick(job)}
              //   key={index}
              // >
              //   <h3 className="text-lg font-semibold uppercase">
              //     {job.jobTitle}
              //   </h3>
              //   <div className="mt-1 mb-3 flex gap-3">
              //     <p className="text-base rounded-lg text-green-700 uppercase bg-green-200 px-2 py-1">
              //       {job.jobtype}
              //     </p>
              //     <p className="text-sm text-gray-600 capitalize px-1 py-1">
              //       Salary: ${job.minSalary} - ${job.maxSalary}
              //     </p>
              //   </div>
              //   <div className="flex items-center">
              //     <img
              //       className="w-12 h-12 mr-2 rounded-xl"
              //       src={job.company ? job.company.logo : ""}
              //       alt="Company Logo"
              //     />
              //     <div>
              //       <p className="font-semibold">
              //         {job.company ? job.company.companyname : "Company"}
              //       </p>
              //       <p className="text-sm text-gray-500 flex items-center gap-1">
              //         <IoLocationOutline /> {job.state}, {job.country}
              //       </p>
              //     </div>
              //   </div>
              //   <div className="flex justify-end">
              //     <FaRegBookmark
              //       className="text-gray-500 hover:text-gray-700 cursor-pointer"
              //       onClick={() => {
              //         HandleFaovriteJobs(job._id);
              //       }}
              //     />
              //   </div>
              // </div>
            ))}
      </div>

      <div className="flex items-center" style={{ justifyContent: "center" }}>
        <Pagination
          currentPage={currentPage}
          totalPages={arrayNavCount}
          onPageChange={handlePageChange}
        />
      </div>

      {showFilterModal && (
        <div className="filter-modal">
          <div className="filter-modal-content">
            <h2 style={{ color: "#234FD1" }}>Filter Jobs</h2>
            {/* Industry checkboxes */}
            <div>
              <h3 style={{ color: "#234FD1" }}>Industry</h3>
              <label>
                <input
                  type="checkbox"
                  name="industry"
                  value="intern"
                  onChange={handleIndustryChange}
                  checked={selectedIndustry.includes("intern")}
                />
                intern
              </label>
              <label>
                <input
                  type="checkbox"
                  name="industry"
                  value="Finance"
                  onChange={handleIndustryChange}
                  checked={selectedIndustry.includes("Finance")}
                />
                Finance
              </label>
            </div>
            {/* Salary range radio buttons */}
            <div>
              <h3 style={{ color: "#234FD1" }}>Salary Range</h3>
              <label>
                <input
                  type="radio"
                  name="salary"
                  value="0-50000"
                  onChange={handleSalaryRangeChange}
                  checked={selectedSalaryRange === "0-50000"}
                />
                Less than $50,000
              </label>
              <label>
                <input
                  type="radio"
                  name="salary"
                  value="50000-100000"
                  onChange={handleSalaryRangeChange}
                  checked={selectedSalaryRange === "50000-100000"}
                />
                $50,000 - $100,000
              </label>
              <label>
                <input
                  type="radio"
                  name="salary"
                  value="100000+"
                  onChange={handleSalaryRangeChange}
                  checked={selectedSalaryRange === "100000+"}
                />
                Greater than $100,000
              </label>
            </div>
            {/* Job type checkboxes */}
            <div>
              <h3 style={{ color: "#234FD1" }}>Job Type</h3>
              <label>
                <input
                  type="checkbox"
                  name="jobType"
                  value="Full Time"
                  onChange={handleJobTypeChange}
                  checked={selectedJobType.includes("Full Time")}
                />
                Full Time
              </label>
              <label>
                <input
                  type="checkbox"
                  name="jobType"
                  value="Part Time"
                  onChange={handleJobTypeChange}
                  checked={selectedJobType.includes("Part Time")}
                />
                Part Time
              </label>
              <label>
                <input
                  type="checkbox"
                  name="jobType"
                  value="Remote"
                  onChange={handleJobTypeChange}
                  checked={selectedJobType.includes("Remote")}
                />
                Remote
              </label>
            </div>
            {/* Job sorting */}
            <div>
              <h3 style={{ color: "#234FD1" }}>Job Sort by</h3>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="asc"
                  onChange={handleSort}
                  checked={selectedSort === "asc"}
                />
                Most Recent Jobs
              </label>
            </div>
            <div className="flex items-center content-between">
              <button onClick={() => setShowFilterModal(false)}>
                Clear Filters
              </button>
              <button className="ml-4" onClick={handleFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobList;

