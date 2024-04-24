import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import JobFilter from "./CompanyFilter";
import { IoLocationOutline } from "react-icons/io5";
import { ListAllCompanies } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";

interface Job {
  _id: string;
  logo: string;
  jobTitle: string;
  jobtype: string;
  minSalary: string;
  maxSalary: string;
  country: string;
  state: string;
  name: string;
}

const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const [searchApplied, setSearchApplied] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [joblist, setJoblist] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [jobDiffFilter, setJobDiffFilter] = useState<any>({});

  // State variables to track selected options
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);

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

  const handleFilters = () => {
    console.log(selectedIndustry);

    const queryParameters = {
      selectedIndustries: selectedIndustry || [],
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
        job.name.toLowerCase().includes(searchTitle.toLowerCase())
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

  console.log(currentPage);

  useEffect(() => {
    const fetchData = async () => {
      try {

        console.log(jobDiffFilter);
        
        const respo = await ListAllCompanies(jobDiffFilter, currentPage);
        console.log(respo);

        setArrayNavCount(respo.current);
        setJoblist(respo.AllEmployers);
        setFilteredJobs(respo.AllEmployers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [jobDiffFilter, currentPage]);

  console.log(arrayNavCount);
  const pageNumbers = Array.from({ length: arrayNavCount }, (_, i) => i + 1);

  console.log(pageNumbers);

  const handleClick = (job: any) => {
    console.log(job);

    setSelectedJob(job);
    console.log(job._id);
    navigate(`/find-employer/employer-details/${job.companyId}`);
  };

  console.log(selectedJob);

  return (
    <>
      <Navbar />
      <div className="job-Show">
        <div className="job-show-left">
          <h1>Find Job</h1>
        </div>
        <div className="job-show-right">Home/ Find Employers</div>
      </div>
      <div className="job-search-apply">
        <JobFilter
          onSearchTitle={handleSearchTitle}
          onSearchLocation={handleSearchLocation}
        />
        <div>
          <button className="mr-5" onClick={() => setShowFilterModal(true)}>
            Filter
          </button>
          <button onClick={handleApplyFilters}>Apply</button>
        </div>
      </div>

      <div className="job-list">
        {searchApplied
          ? filteredJobs.map((job, index) => (
              <div
                className="job-box"
                style={{ justifyContent: "space-between" }}
                key={index}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleClick(job)}
                >
                  <div className="job-box-logo-loca">
                    <img
                      className="img-size-data"
                      src={job ? job.logo : ""}
                      alt="Company Logo"
                    />
                    <p>
                      {job.name ? (
                        <p className="company-bold">{job.name}</p>
                      ) : (
                        <p>company</p>
                      )}
                      <p className="location-change flex justify-center items-center gap-1">
                        {" "}
                        <IoLocationOutline />{" "}
                        {job.state != "" ? job.state : "state"},{" "}
                        {job.country != "" ? job.country : "country"}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="text-center class-for-open-postions">
                  <h2>Open Positions(3)</h2>
                </div>
              </div>
            ))
          : joblist.map((job, index) => (
              <div
                className="job-box"
                style={{ justifyContent: "space-between" }}
                key={index}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleClick(job)}
                >
                  <div className="job-box-logo-loca">
                    <img
                      className="img-size-data"
                      src={job ? job.logo : ""}
                      alt="Company Logo"
                    />
                    <p>
                      {job.name ? (
                        <p className="company-bold">{job.name}</p>
                      ) : (
                        <p className="company-bold">company</p>
                      )}
                      <p className="location-change flex justify-center items-center gap-1">
                        {" "}
                        <IoLocationOutline />{" "}
                        {job.state != "" ? job.state : "state"},{" "}
                        {job.country != "" ? job.country : "country"}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="text-center class-for-open-postions">
                  <h2>Open Positions(3)</h2>
                </div>
              </div>
            ))}
      </div>
      <div className="flex items-center" style={{ justifyContent: "center" }}>
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm gap-3">
            {currentPage > 1 && (
              <li>
                <button
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border-gray-300 rounded-full hover:text-white dark:text-gray-400 hover:bg-blue-500 dark:hover:text-white"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </button>
              </li>
            )}
            {pageNumbers.map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white ${
                    pageNumber === currentPage
                      ? "border-gray-800 text-gray-800" // Highlight current page
                      : "border-gray-300"
                  } hover:bg-gray-100 hover:text-gray-700 dark:text-black bg-blue-100 rounded-full dark:hover:bg-blue-500 dark:hover:text-white`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            {currentPage < 2 && (
              <li>
                <button
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border-gray-300 rounded-full hover:text-white dark:text-gray-400 hover:bg-blue-500 dark:hover:text-white"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
              </li>
            )}
          </ul>
        </nav>
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
                  value="technology"
                  onChange={handleIndustryChange}
                  checked={selectedIndustry.includes("technology")}
                />
                Technology
              </label>
              <label>
                <input
                  type="checkbox"
                  name="industry"
                  value="finance"
                  onChange={handleIndustryChange}
                  checked={selectedIndustry.includes("finance")}
                />
                Finance
              </label>
              <label>
                <input
                  type="checkbox"
                  name="industry"
                  value="education"
                  onChange={handleIndustryChange}
                  checked={selectedIndustry.includes("education")}
                />
                Education
              </label>
              <label>
                <input
                  type="checkbox"
                  name="industry"
                  value="manufacturing"
                  onChange={handleIndustryChange}
                  checked={selectedIndustry.includes("manufacturing")}
                />
                Manufacturing
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

export default CompanyList;
