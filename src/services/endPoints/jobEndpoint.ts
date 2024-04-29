const JobRoute = {
    companyJobList: (email : string) =>  `/api/v3/job/list-jobs-company/${email}`,
    SpecificJobAppliedCandiadates : (id : string) => `/api/v3/job/job-list-specific-user/${id}`,
    JobAppliedCandiadatesDetails : (id: string, jobId: string) => `/api/v3/job/job-applied-user-detail/${id}/${jobId}`,
    MakeShortListCandidate : (id: string, jobId: string) => `/api/v3/job/user-shortlisted/${id}/${jobId}`,
    makeJobFavoriite : (id : string) => `/api/v3/job/make-favorite-job/${id}`,
    ListAllPreferredJobs : "/api/v3/job/preferred",
}

export default JobRoute;