const authRoutes = {
    signup: "/api/v1/auth/register",

    sendEmail: "/api/v1/auth/activate-user",
    
    login: '/api/v1/auth/login',

    UserByEmail:'/api/v1/auth/forget-password',
    
    UpadtePassByEmail:'/api/v1/auth/update-password',

    Adminsignin: '/v4/api/auth/admin/signin',
    
    Adminlogin: '/v4/api/auth/admin/login',

    getAdmin: (adminId: string) => `/v4/api/auth/admin/${adminId}`,

    AdminsendEmail: '/v4/api/auth/admin/verify',

    emailVerification: '/v4/api/auth/otp',

    getUser: (id: string) => `/v4/api/auth?id=${id}`,

    getrole: (role: string) => `/v4/api/auth?role=${role}`,

    getEmail: (email: string) => `/v4/api/auth?email=${email}`,
    
    updateAuth: (email: string) => `/v4/api/auth/update/${email}`,
  };
  
  export default authRoutes;
  