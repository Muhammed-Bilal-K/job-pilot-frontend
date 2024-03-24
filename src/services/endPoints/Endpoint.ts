const Routes = {
    signup: "/api/v1/auth/register",

    sendEmail: "/api/v1/auth/activate-user",
    
    login: '/api/v1/auth/login',

    UserByEmail:'/api/v1/auth/forget-password',
    
    UpadtePassByEmail:'/api/v1/auth/update-password',

    resendUserOtp : '/api/v1/auth/resend-otp',

    loginByAdmin: '/api/v6/admin/auth/login',

    PlanCreatedByAdmin: '/api/v6/admin/auth/create-subscription',

    GetAllPlansDetails : "/api/v6/admin/auth/get-plan-details",

    Payment : "/api/v2/employer/plans",

    CreateJob : "/api/v3/job/job-create"
  };
  
  export default Routes;
  