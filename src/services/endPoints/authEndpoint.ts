const authRoutes = {
    signup: "/api/v1/auth/register",

    sendEmail: "/api/v1/auth/activate-user",
    
    login: '/api/v1/auth/login',

    UserByEmail:'/api/v1/auth/forget-password',
    
    UpadtePassByEmail:'/api/v1/auth/update-password',

    resendUserOtp : '/api/v1/auth/resend-otp',
  };
  
  export default authRoutes;
  