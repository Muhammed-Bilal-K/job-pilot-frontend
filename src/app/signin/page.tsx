import React, { MouseEvent, useState } from "react";
import Signlogo from "../../assets/sigininlogo.png";
import logoPilot from "../../assets/Logo.png";
import candidate from "../../assets/image 6.png";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import employer from "../../assets/image 7.png";
import { SocialAuth, register } from "../../apis/auth";
import { auth, provider } from "../utilities/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { signInSuccess } from "../../redux/slices/employer.slice";

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

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch =  useDispatch();
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("candidate");

  function handleTypeSelection(type: string) {
    setSelectedType(type);
  }

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log({
        selectedType,
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      if (
        email.trim() == "" ||
        username.trim() == "" ||
        email.trim() == "" ||
        confirmPassword.trim() == "" ||
        password.trim() == ""
      ) {
        return message.info("Input field can't be empty");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        message.info("Invalid email format");
        return;
      }

      if (password && password.length < 4 && confirmPassword) {
        message.info("Password minimum length should be 4");
        return;
      }

      if (password === confirmPassword && email && username) {
        message.open({
          type: "loading",
          content: "Action in progress..",
          duration: 2,
        });
        const newUserRegi: FormValues = {
          fullname: fullName,
          username: username,
          email: email,
          password: password,
          confirmpassword: confirmPassword,
          role: selectedType,
        };
        const res = await register(newUserRegi);
        console.log(res.data);

        if (
          res.data.message == "Otp successfully sent to your email address."
        ) {
          message.success(res.data.message);
          localStorage.setItem("VerifyToken", res.data.activationToken!);
          setTimeout(() => {
            navigate("/verification", { state: { email: email } });
          }, 1000);
        }
      } else {
        message.info("Password doesn't Match");
      }
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      
      const userRole = prompt("Choose your role (employer/candidate)");
      if (userRole && (userRole === "employer" || userRole === "candidate")) {
        const socialAuth: ISocialAuth = {
          fullname: user.displayName,
          username: user.displayName?.split(" ").join("").toLowerCase() + "01",
          email: user.email,
          role: userRole,
        };
        const res = await SocialAuth(socialAuth);
        console.log(res);
        if (res.data.message == "signed successfully") {
          message.success(res.data.message);
          setTimeout(() => {
            if (res.data.user.role === "employer") {
              dispatch(signInSuccess(res.data.user));
              localStorage.setItem("Emplo", res.data.token);
              navigate("/employer/emplo-dash");
            } else {
              localStorage.setItem("Token", res.data.token);
              navigate("/");
            }
          }, 1000);
        }
      } else {
        console.error("Invalid role selected.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="register-page flex justify-center items-center relative">
        <div className="register-form mt-20">
          <div className="jobpilot-logo absolute top">
            <div className="job-logo">
              <img src={logoPilot} alt="login" className="login" />
            </div>
          </div>
          <h1 className="create_account">Create Account.</h1>
          <h4 className="already_account">
            already have account?{" "}
            <h2
              className="inline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </h2>
          </h4>
          <div className="account_selections">
            <h3>CREATE ACCOUNT AS A</h3>
            <div className="seperate-the-select">
              <label
                className={selectedType === "candidate" ? "selected" : ""}
                onClick={() => handleTypeSelection("candidate")}
              >
                <span className="checkbox-text">
                  <img src={candidate} alt="candidate" /> Candidate
                </span>
              </label>
              <label
                className={selectedType === "employer" ? "selected" : ""}
                onClick={() => handleTypeSelection("employer")}
              >
                <span className="checkbox-text">
                  <img src={employer} alt="employer" /> Employer
                </span>
              </label>
            </div>
          </div>

          <div className="all-aligh-set">
            <div className="flex justify-between">
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="custom-input"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="custom-input"
                  placeholder="Username"
                />
              </div>
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-input custom-width"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input custom-width"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="custom-input custom-width"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div>
            <h6 className="mt-3 term-service">
              <input type="checkbox" name="" id="" /> I've read and agree with
              your Terms of Services
            </h6>
          </div>
          <button onClick={handleRegister} className="register-button">
            Create Account<span className="text"> &#8594;</span>
          </button>
          <div className="text-center">
            <span>OR</span>
          </div>
          <button onClick={handleGoogleSignIn} className="google-signup-button">
            Sign Up with Google
          </button>
        </div>
        <div className="register-image">
          <img className="" src={Signlogo} alt="Registration" />
        </div>
      </div>
    </>
  );
};

export default Signin;
