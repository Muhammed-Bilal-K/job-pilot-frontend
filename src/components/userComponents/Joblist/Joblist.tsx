import React, { useState } from 'react';
import Navbar from "../navbar/Navbar";
import JobFilter from "./JobFilter";

const jobs = [
    {
      job_title: "Junior Software Engineer",
      job_type: "Full-time",
      min_salary: 50000,
      max_salary: 70000,
      company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/900px-Facebook_logo_%28square%29.png",
      country: "United States",
      state: "California",
    },
    {
      job_title: "Senior Software Engineer",
      job_type: "Full-time",
      min_salary: 80000,
      max_salary: 120000,
      company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/900px-Facebook_logo_%28square%29.png",
      country: "United States",
      state: "California",
    },
    {
      job_title: "Software Engineer (Remote)",
      job_type: "Remote",
      min_salary: 70000,
      max_salary: 100000,
      company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/900px-Facebook_logo_%28square%29.png",
      country: "United States",
      state: "California",
    },
    {
      job_title: "Software Developer",
      job_type: "Full-time",
      min_salary: 60000,
      max_salary: 90000,
      company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/900px-Facebook_logo_%28square%29.png",
      country: "United States",
      state: "New York",
    },
    {
      job_title: "Frontend Developer",
      job_type: "Full-time",
      min_salary: 55000,
      max_salary: 85000,
      company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/900px-Facebook_logo_%28square%29.png",
      country: "United States",
      state: "Texas",
    },
    {
      job_title: "Backend Engineer",
      job_type: "Full-time",
      min_salary: 70000,
      max_salary: 110000,
      company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/900px-Facebook_logo_%28square%29.png",
      country: "United States",
      state: "Washington",
    },
    {
      job_title: "Software Architect",
      job_type: "Full-time",
      min_salary: 90000,
      max_salary: 150000,
      company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/900px-Facebook_logo_%28square%29.png",
      country: "United States",
      state: "Massachusetts",
    },
  ];

interface Job {
  job_title: string;
  job_type: string;
  min_salary: number;
  max_salary: number;
  company_logo: string;
  country: string;
  state: string;
}

const JobList: React.FC = () => {
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
    const [searchApplied, setSearchApplied] = useState(false);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
  
    const handleSearchTitle = (title: string) => {
      setSearchTitle(title);
    };
    
    const handleSearchLocation = (location: string) => {
      setSearchLocation(location);
    };
  
    const handleApplyFilters = () => {
      let filtered = jobs;
      if (searchTitle) {
        filtered = filtered.filter(job => job.job_title.toLowerCase().includes(searchTitle.toLowerCase()));
      }
      if (searchLocation) {
        filtered = filtered.filter(job => job.country.toLowerCase().includes(searchLocation.toLowerCase()) || job.state.toLowerCase().includes(searchLocation.toLowerCase()));
      }
      setFilteredJobs(filtered);
      setSearchApplied(true);
    };
  
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
              <h3>{job.job_title}</h3>
              <div className="job-box-type-amount">
                <p>Job Type: {job.job_type}</p>
                <p>
                  Salary: ${job.min_salary} - ${job.max_salary}
                </p>
              </div>
              <div className="job-box-logo-loca">
                <img className="w-10" src={job.company_logo} alt="Company Logo" />
                <p>
                  {job.state}, {job.country}
                </p>
              </div>
            </div>
          )) : jobs.map((job, index) => (
            <div className="job-box" key={index}>
              <h3>{job.job_title}</h3>
              <div className="job-box-type-amount">
                <p>Job Type: {job.job_type}</p>
                <p>
                  Salary: ${job.min_salary} - ${job.max_salary}
                </p>
              </div>
              <div className="job-box-logo-loca">
                <img className="w-10" src={job.company_logo} alt="Company Logo" />
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