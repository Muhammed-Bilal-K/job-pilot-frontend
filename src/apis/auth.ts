import { Api, Api2, Api3 } from "../services/api";
import authRoutes from "../services/endPoints/Endpoint";
import EmployerRoute from "../services/endPoints/companyEndPoint";
// import JobRoute from "../services/endPoints/jobEndpoint";

interface FormValues {
  fullname: string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmpassword?: string | undefined;
  role?: string | undefined;
}

interface ISocialAuth {
  fullname: string | null;
  username: string | null;
  email: string | null;
  role: string | undefined;
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

const getHeaders = (token: string) => ({
  headers: {
    Authorization: token,
  },
});

export const register = async (newUserRegi: FormValues) => {
  try {
    const res = await Api.post(authRoutes.signup, { ...newUserRegi });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const SocialAuth = async (SocialAuth: ISocialAuth) => {
  try {
    const res = await Api.post(authRoutes.SocialAuth, { ...SocialAuth });

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

export const PlanCreatedByAdmin = async (
  data: PlanInputValues,
  token: string
) => {
  try {
    const res = await Api.post(
      authRoutes.PlanCreatedByAdmin,
      { ...data },
      getHeaders(token)
    );

    return res;
  } catch (err: any) {
    throw err;
  }
};

export const PlanDeletedByAdmin = async (id: string, token: string) => {
  try {
    const res = await Api.delete(
      authRoutes.planDeleteByAdmin(id),
      getHeaders(token)
    );

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteUserByAdmin = async (id: string) => {
  try {
    console.log(id);

    const res = await Api.delete(authRoutes.deleteUserByAdmin(id));

    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const GetAllPlansDetails = async () => {
  try {
    const res = await Api.get(authRoutes.GetAllPlansDetails);

    return res;
  } catch (err: any) {
    throw err;
  }
};

export const UpdatePlan = async (id: string, planData: any) => {
  try {
    const res = await Api.put(authRoutes.updateSubscription(id), planData);

    return res;
  } catch (err: any) {
    throw err;
  }
};

export const GetCompanyInfo = async () => {
  try {
    const res = await Api3.get(authRoutes.GetCompanyInfo);

    return res;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const makePayment = async (stripeCustomer: any) => {
  try {
    const res = await Api2.post(authRoutes.Payment, { ...stripeCustomer });
    return res;
  } catch (err) {
    throw err;
  }
};

export const CreateJobByCompany = async (data: any) => {
  try {
    const res = await Api3.post(authRoutes.CreateJob, { ...data });
    return res;
  } catch (err) {
    throw err;
  }
};

export const ListAllJobs = async (
  queryParameters: any,
  currentPage: number
) => {
  try {
    const res = await Api3.get(authRoutes.ListAllJobs, {
      params: { ...queryParameters, currentPage: currentPage },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const ListAllCompanies = async (
  queryParameters: any,
  currentPage: number
) => {
  try {
    const res = await Api2.get(EmployerRoute.ListAllCompanies, {
      params: { ...queryParameters, currentPage: currentPage },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};





export const ListAllJobApplicant = async () => {
  try {
    const res = await Api3.get(authRoutes.ListAllJobApplicant);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const CurrentAuthInfo = async () => {
  try {
    const res = await Api2.get(authRoutes.getListofAuth);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const currentUser = async (token: string) => {
  try {
    const res = await Api.get(authRoutes.currentUser, getHeaders(token));
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const applyForJob = async (formData: any) => {
  try {
    console.log(formData);

    const response = await Api3.post(authRoutes.ApplyForJob, formData);
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw new Error("Failed to apply for job");
  }
};

export const ParticularUser = async (id: string) => {
  try {
    const response = await Api3.get(authRoutes.ListAllJobApplicantById(id));
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw new Error("Failed to apply for job");
  }
};

export const FavoriteJobByUser = async (id: string) => {
  try {
    const response = await Api3.get(authRoutes.FavoriteJobByUser(id));
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw new Error("Failed to apply for job");
  }
};

export const allUsers = async () => {
  try {
    const response = await Api.get(authRoutes.allUsers);
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw new Error("Failed to apply for job");
  }
};

export const blockUser = async (id: string) => {
  try {
    const response = await Api.put(authRoutes.blockUser(id));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to block user");
  }
};

export const blockEmployer = async (id: string) => {
  try {
    const response = await Api.put(authRoutes.blockEmployer(id));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to block user");
  }
};

export const VerifyEmployer = async (id: string) => {
  try {
    const response = await Api.put(authRoutes.VerifyEmployer(id));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to block user");
  }
};

export const DeniedEmployer = async (id: string) => {
  try {
    const response = await Api.put(authRoutes.DeniedEmployer(id));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to block user");
  }
};

export const allEmployers = async () => {
  try {
    const response = await Api.get(authRoutes.allEmployer);
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw new Error("Failed to apply for job");
  }
};
