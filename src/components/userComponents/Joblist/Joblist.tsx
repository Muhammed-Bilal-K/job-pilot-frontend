import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar";
import JobFilter from "./JobFilter";
import { ListAllJobs } from '../../../apis/auth';

interface Job {
  jobTitle: string;
  jobtype: string;
  minSalary: string;
  maxSalary: string;
  country: string;
  state: string;
  companylogo :string;
}

const JobList: React.FC = () => {
  const [searchApplied, setSearchApplied] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [joblist, setJoblist] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const handleSearchTitle = (title: string) => {
    setSearchTitle(title);
  };

  const handleSearchLocation = (location: string) => {
    setSearchLocation(location);
  };

  const handleApplyFilters = () => {
    let filtered = joblist;
    if (searchTitle) {
      filtered = filtered.filter(job => job.jobTitle.toLowerCase().includes(searchTitle.toLowerCase()));
    }
    if (searchLocation) {
      filtered = filtered.filter(job => job.country.toLowerCase().includes(searchLocation.toLowerCase()) || job.state.toLowerCase().includes(searchLocation.toLowerCase()));
    }
    setFilteredJobs(filtered);
    setSearchApplied(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ListAllJobs();
        setJoblist(res.data.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="job-Show">
        <div className="job-show-left">
          <h1>Find Job</h1>
        </div>
        <div className="job-show-right">Home/Find Job</div>
      </div>
      <div className='job-search-apply'>
        <JobFilter onSearchTitle={handleSearchTitle} onSearchLocation={handleSearchLocation} />
        <button onClick={handleApplyFilters}>Apply</button>
      </div>
      <div className="job-list">
        {searchApplied ? filteredJobs.map((job, index) => (
          <div className="job-box" key={index}>
            <h3>{job.jobTitle}</h3>
            <div className="job-box-type-amount">
              <p>Job Type: {job.jobtype}</p>
              <p>
                Salary: ${job.minSalary} - ${job.maxSalary}
              </p>
            </div>
            <div className="job-box-logo-loca">
              {/* <img className="w-10" src={job.company_logo} alt="Company Logo" /> */}
              <p>
                {job.state}, {job.country}
              </p>
            </div>
          </div>
        )) : joblist.map((job, index) => (
          <div className="job-box" key={index}>
            <h3>{job.jobTitle}</h3>
            <div className="job-box-type-amount">
              <p>Job Type: {job.jobtype}</p>
              <p>
                Salary: ${job.minSalary} - ${job.maxSalary}
              </p>
            </div>
            <div className="job-box-logo-loca">
              <img className="w-10" src={job.companylogo} alt="Company Logo" />
              <p>
                {job.state}, {job.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobList;
