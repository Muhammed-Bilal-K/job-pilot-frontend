import React, { useState } from "react";
import loginlogo from "../../assets/loginlogo.png";
import logoPilot from "../../assets/Logo.png";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { login, SocialAuth } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/slices/employer.slice";
import { LoginInSuccess } from "../../redux/slices/user.slice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface InputValues {
  email: string | undefined;
  password: string | undefined;
}

interface IPassCredential {
  email: string;
  name: string;
}

interface ISocialAuth {
  email: string | null;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (email.trim() == "" || password.trim() == "") {
        message.info("Input can't empty!");
        return;
      }
      const UserLogin: InputValues = {
        email: email,
        password: password,
      };
      const res = await login(UserLogin);
      if (res.data.message == "Account logined successfully") {
        message.success(res.data.message);
        if (res.data.user.role === "employer") {
          dispatch(signInSuccess(res.data.user));
          localStorage.setItem("Emplo", res.data.token);
          setTimeout(() => {
            navigate("/employer/emplo-dash");
          }, 1000);
        } else {
          dispatch(LoginInSuccess(res.data.user));
          localStorage.setItem("Token", res.data.token);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleGoogleSignInSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        const decodedToken = jwtDecode<JwtPayload & IPassCredential>(
          credentialResponse.credential
        );
        handleGoogleSignIn(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("No credential found");
    }
  };

  const handleGoogleSignIn = async (
    decodedToken: JwtPayload & IPassCredential
  ) => {
    try {
      const socialAuth: ISocialAuth = {
        email: decodedToken.email,
      };
      const res = await SocialAuth(socialAuth);
      
      if (res.data.message == "signed successfully") {
        message.success(res.data.message);
        if (res.data.user.role === "employer") {
          dispatch(signInSuccess(res.data.user));
          localStorage.setItem("Emplo", res.data.token);
          setTimeout(() => {
            navigate("/employer/emplo-dash");
          }, 1000);
        } else {
          dispatch(LoginInSuccess(res.data.user));
          localStorage.setItem("Token", res.data.token);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (error: any) {
      message.error("Google Sign-In failed");
    }
  };

  const handleGoogleSignInError = () => {
    message.error("Google Sign-In was unsuccessful. Try again later");
  };


  return (
    <div className="register-page flex justify-center items-center relative min-h-screen">
      <div className="register-form mt-20 max-w-lg w-full px-6 sm:px-10">
        <div className="jobpilot-logo absolute top-0 left-0 right-0 flex justify-center sm:static">
          <img
            onClick={() => {
              navigate("/");
            }}
            src={logoPilot}
            alt="login"
            className="h-12 w-auto"
          />
        </div>
        <h1 className="create_account text-2xl font-bold mt-6">Sign In.</h1>
        <h4 className="already_account mt-2 text-sm">
          Don't have an account?{" "}
          <span
            className="inline cursor-pointer text-blue-600"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </h4>
        <div className="all-align-set mt-4">
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input custom-width w-full px-3 py-2 border rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-input custom-width w-full px-3 py-2 border rounded-md"
              placeholder="Password"
            />
          </div>
          <p
            onClick={() => navigate("/forgetpass")}
            className="cursor-pointer text-right text-sm text-blue-600"
          >
            Forget Password
          </p>
        </div>
        <div className="mt-4">
          <h6 className="term-service flex items-center text-sm">
            <input type="checkbox" className="mr-2" /> I've read and agree with
            your Terms of Services
          </h6>
        </div>
        <button
          onClick={handleRegister}
          className="register-button mt-4 w-full py-2 bg-blue-600 text-white rounded-md"
        >
          Sign In<span className="ml-2">&#8594;</span>
        </button>
        <div className="text-center mt-4">
          <span>OR</span>
        </div>
        <div className="flex justify-center items-center">
          <GoogleLogin
            onSuccess={handleGoogleSignInSuccess}
            onError={handleGoogleSignInError}
          />
        </div>
      {/* <h6>candidate can register directly</h6>
      <h6>employer credential example</h6>
      <h6 className="text-xs">email : jebaw72817@acentni.com</h6>
      <h6 className="text-xs">pass : 12345</h6> */}
      </div>
      <div className="register-image hidden lg:flex">
        <img src={loginlogo} alt="Registration" className="h-full w-auto" />
      </div>
    </div>
  );
};

export default Login;