const Routes = {
  signup: "/api/v1/auth/register",

  SocialAuth: "/api/v1/auth/social-auth",

  sendEmail: "/api/v1/auth/activate-user",

  login: "/api/v1/auth/login",

  UserByEmail: "/api/v1/auth/forget-password",

  UpadtePassByEmail: "/api/v1/auth/update-password",

  resendUserOtp: "/api/v1/auth/resend-otp",

  loginByAdmin: "/api/v6/admin/auth/login",

  PlanCreatedByAdmin: "/api/v6/admin/auth/create-subscription",

  planDeleteByAdmin: (id: string) => `/api/v6/admin/auth/delete-subscription/${id}`,

  deleteUserByAdmin: (id: string) => `/api/v6/admin/auth/delete-specific-user/${id}`,

  GetAllPlansDetails: "/api/v6/admin/auth/get-plan-details",

  updateSubscription: (id: string) => `/api/v6/admin/auth/subscription/plans/${id}`,

  Payment: "/api/v2/employer/plans",

  getListofAuth: "/api/v2/employer/list-all-auth",

  currentUser: "/api/v1/auth/current-user-data",

  CreateJob: "/api/v3/job/job-create",

  ListAllJobs: "/api/v3/job/job-list",

  ListAllJobApplicant: "/api/v3/job/all-job-applicant",

  ListAllJobApplicantById: (id: string) => `/api/v3/job/applicant/${id}`,

  FavoriteJobByUser: (id: string) => `/api/v3/job/auth-user-by-id/${id}`,

  blockUser: (id: string) => `/api/v1/auth/user/${id}`,

  blockEmployer: (id: string) => `/api/v1/auth/employer/${id}`,

  VerifyEmployer: (id: string) => `/api/v6/admin/auth/employer-verify-success/${id}`,

  DeniedEmployer: (id: string) => `/api/v6/admin/auth/employer-verify-denied/${id}`,

  GetCompanyInfo: "/api/v3/job/company-detail",

  ApplyForJob: "/api/v3/job/apply",

  allUsers: "/api/v1/auth/list-all-user",

  allEmployer: "/api/v1/auth/list-all-employer",
};

export default Routes;
