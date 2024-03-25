import { Api, Api2, Api3 } from "../services/api";
import authRoutes from "../services/endPoints/Endpoint";

interface FormValues {
  fullname: string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmpassword?: string | undefined;
  role?: string | undefined;
}

interface InputValues {
  email: string | undefined;
  password: string | undefined;
}

interface InputPass {
  email: string | undefined;
  npassword: string | undefined;
}

interface InputValuesEmail {
  email: string | undefined;
}

interface OtpValues {
  activation_token: string | undefined;
  activation_code: string | undefined;
}

interface OtpResed {
  email: string | undefined;
}

interface PlanInputValues {
  name: string;
  description: string;
  amount: string;
  features: string[];
}

export const register = async (newUserRegi: FormValues) => {
  try {
    const res = await Api.post(authRoutes.signup, { ...newUserRegi });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const activeUser = async (otp: OtpValues) => {
  try {
    const res = await Api.post(authRoutes.sendEmail, { ...otp });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const resendUserOtp = async (email: OtpResed) => {
  try {
    const res = await Api.post(authRoutes.resendUserOtp, { email });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const login = async (creadits: InputValues) => {
  try {
    const res = await Api.post(
      authRoutes.login,
      { ...creadits },
      { withCredentials: true }
    );

    return res;
  } catch (err: any) {
    console.log(err);
    
    throw err;
  }
};

export const UserByEmail = async (creadits: InputValuesEmail) => {
  try {
    const res = await Api.post(authRoutes.UserByEmail, { ...creadits });

    return res;
  } catch (err: any) {
    throw err;
  }
};

export const UpdatePassByEmail = async (data: InputPass) => {
  try {
    const res = await Api.post(authRoutes.UpadtePassByEmail, { ...data });

    return res;
  } catch (err: any) {
    throw err;
  }
};

export const LoginByAdmin = async (data: InputValues) => {
  try {
    const res = await Api.post(authRoutes.loginByAdmin, { ...data });

    return res;
  } catch (err: any) {
    throw err;
  }
};

export const PlanCreatedByAdmin = async (data: PlanInputValues) => {
  try {
    const res = await Api.post(authRoutes.PlanCreatedByAdmin, { ...data });

    return res;
  } catch (err: any) {
    throw err;
  }
};

export const GetAllPlansDetails = async () => {
  try {
    const res = await Api.get(authRoutes.GetAllPlansDetails);

    return res;
  } catch (err : any) {
    throw err;
  }
};


export const makePayment = async (stripeCustomer : any) => {
  try {
    const res = await Api2.post(authRoutes.Payment , { ...stripeCustomer });
    return res;
  } catch (err) {
    throw err;
  }
};

export const CreateJobByCompany = async (data : any) => {
  try {
    const res = await Api3.post(authRoutes.CreateJob , { ...data });
    return res;
  } catch (err) {
    throw err;
  }
};

export const ListAllJobs = async () => {
  try {
    const res = await Api3.get(authRoutes.ListAllJobs);
    return res;
  } catch (err) {
    throw err;
  }
};
