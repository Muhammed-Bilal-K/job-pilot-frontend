import { Api } from "../services/api";
import authRoutes from "../services/endPoints/authEndpoint";

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
  email : string | undefined;
  npassword: string | undefined;
}

interface InputValuesEmail {
  email: string | undefined;
}

interface OtpValues {
  activation_token: string | undefined;
  activation_code: string | undefined; 
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

export const login = async (creadits: InputValues) => {
  try {
    const res = await Api.post(authRoutes.login, { ...creadits });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const UserByEmail = async (creadits: InputValuesEmail) => {
  try {
    const res = await Api.post(authRoutes.UserByEmail, { ...creadits });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const UpdatePassByEmail = async (data : InputPass) => {
  try {
    const res = await Api.post(authRoutes.UpadtePassByEmail, { ...data });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

