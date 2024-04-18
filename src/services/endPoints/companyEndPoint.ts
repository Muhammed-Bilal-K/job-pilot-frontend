const EmployerRoute = {
    companyInfoCreate: "/api/v2/employer/save-data",
    specificCompany: (id : string) =>  `/api/v2/employer/list-specific-company/${id}`,
    companyJobList: (email : string) =>  `/api/v2/employer/list-jobs-company/${email}`,
}

export default EmployerRoute;