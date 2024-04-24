import { ListAllCompanies } from "../../apis/auth";

const EmployerRoute = {
    companyInfoCreate: "/api/v2/employer/save-data",
    companyInfoUpdate: "/api/v2/employer/update-found-info",
    ListAllCompanies : '/api/v2/employer/list-all-employers',
    specificCompany: (id : string) =>  `/api/v2/employer/list-specific-company/${id}`,
    companyJobList: (email : string) =>  `/api/v2/employer/list-jobs-company/${email}`,
}

export default EmployerRoute;