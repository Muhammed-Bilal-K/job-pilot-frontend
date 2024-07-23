// import React, { MouseEvent, useState } from "react";
// import Signlogo from "../../assets/sigininlogo.png";
// import logoPilot from "../../assets/Logo.png";
// import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
// import { LuUserCircle2 } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import { message } from "antd";
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { SocialAuth, register } from "../../apis/auth";
// // import { auth, provider } from "../utilities/firebase";
// // import { signInWithPopup } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { signInSuccess } from "../../redux/slices/employer.slice";
// import { GoogleLogin } from "@react-oauth/google";

// interface FormValues {
//   fullname: string | undefined;
//   username: string | undefined;
//   email: string | undefined;
//   password: string | undefined;
//   confirmpassword?: string | undefined;
//   role?: string | undefined;
// }

// interface ISocialAuth {
//   fullname: string | null;
//   username: string | null;
//   email: string | null;
//   role: string | undefined;
// }

// interface IPassCreditional {
//   name : string,
//   email : string
// }

// const Signin: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [fullName, setFullName] = useState<string>("");
//   const [username, setUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [selectedType, setSelectedType] = useState<string>("candidate");

//   function handleTypeSelection(type: string) {
//     setSelectedType(type);
//   }

//   const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     try {
//       console.log({
//         selectedType,
//         fullName,
//         username,
//         email,
//         password,
//         confirmPassword,
//       });

//       if (
//         email.trim() == "" ||
//         username.trim() == "" ||
//         email.trim() == "" ||
//         confirmPassword.trim() == "" ||
//         password.trim() == ""
//       ) {
//         return message.info("Input field can't be empty");
//       }

//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         message.info("Invalid email format");
//         return;
//       }

//       if (password && password.length < 4 && confirmPassword) {
//         message.info("Password minimum length should be 4");
//         return;
//       }

//       if (password === confirmPassword && email && username) {
//         message.open({
//           type: "loading",
//           content: "Action in progress..",
//           duration: 2,
//         });
//         const newUserRegi: FormValues = {
//           fullname: fullName,
//           username: username,
//           email: email,
//           password: password,
//           confirmpassword: confirmPassword,
//           role: selectedType,
//         };
//         const res = await register(newUserRegi);
//         console.log(res.data);

//         if (
//           res.data.message == "Otp successfully sent to your email address."
//         ) {
//           message.success(res.data.message);
//           localStorage.setItem("VerifyToken", res.data.activationToken!);
//           setTimeout(() => {
//             navigate("/verification", { state: { email: email } });
//           }, 1000);
//         }
//       } else {
//         message.info("Password doesn't Match");
//       }
//     } catch (error: any) {
//       message.error(error.response.data.message);
//     }
//   };

//   const handleGoogleSignIn = async (PassCreditional: IPassCreditional) => {
//     try {
//       // const result = await signInWithPopup(auth, provider);
//       // const user = result.user;
//       console.log(PassCreditional);

//       const userRole = prompt("Choose your role (employer/candidate)");
//       if (userRole && (userRole === "employer" || userRole === "candidate")) {
//         const socialAuth: ISocialAuth = {
//           fullname: PassCreditional.name,
//           username: PassCreditional.name?.split(" ").join("").toLowerCase() + "01",
//           email: PassCreditional.email,
//           role: userRole,
//         };
//         console.log(socialAuth);

//         // const res = await SocialAuth(socialAuth);
//         // console.log(res);
//         // if (res.data.message == "signed successfully") {
//         //   message.success(res.data.message);
//         //   setTimeout(() => {
//         //     if (res.data.user.role === "employer") {
//         //       dispatch(signInSuccess(res.data.user));
//         //       localStorage.setItem("Emplo", res.data.token);
//         //       navigate("/employer/emplo-dash");
//         //     } else {
//         //       localStorage.setItem("Token", res.data.token);
//         //       navigate("/");
//         //     }
//         //   }, 1000);
//         // }
//       } else {
//         console.error("Invalid role selected.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="register-page flex justify-center items-center relative min-h-screen max-h-screen mb-16">
//       <div className="register-form mt-20 max-w-lg w-full px-6 sm:px-10">
//         <div className="jobpilot-logo absolute top-0 left-0 right-0 flex justify-center sm:static">
//           <img
//             onClick={() => {
//               navigate("/");
//             }}
//             src={logoPilot}
//             alt="login"
//             className="h-12 w-auto"
//           />
//         </div>
//         <h1 className="create_account text-2xl font-bold mt-6">
//           Create Account.
//         </h1>
//         <h4 className="already_account mt-2 text-sm">
//           already have account?{" "}
//           <span
//             className="inline cursor-pointer text-blue-600"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </h4>
//         <div className="account_selections mt-4">
//           <h3 className="text-center text-lg">CREATE ACCOUNT AS A</h3>
//           <div className="flex justify-center mt-2">
//             <label
//               className={`mr-4 p-2 border rounded-md cursor-pointer ${
//                 selectedType === "candidate"
//                   ? "border-blue-600 bg-[#042852] text-white"
//                   : "border-gray-300"
//               }`}
//               onClick={() => handleTypeSelection("candidate")}
//             >
//               <span className="checkbox-text flex items-center">
//                 <LuUserCircle2 className="h-full" /> Candidate
//               </span>
//             </label>
//             <label
//               className={`p-2 border rounded-md cursor-pointer ${
//                 selectedType === "employer"
//                   ? "border-blue-600 bg-[#042852] text-white"
//                   : "border-gray-300"
//               }`}
//               onClick={() => handleTypeSelection("employer")}
//             >
//               <span className="checkbox-text flex items-center">
//                 <HiOutlineBuildingOffice2 className="h-full" /> Employer
//               </span>
//             </label>
//           </div>
//         </div>
//         <div className="all-align-set mt-4">
//           <div className="flex flex-wrap -mx-2">
//             <div className="w-full sm:w-1/2 px-2 mb-4">
//               <input
//                 type="text"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="custom-input w-full px-3 py-2 border rounded-md"
//                 placeholder="Full Name"
//               />
//             </div>
//             <div className="w-full sm:w-1/2 px-2 mb-4">
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="custom-input w-full px-3 py-2 border rounded-md"
//                 placeholder="Username"
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="custom-input w-full px-3 py-2 border rounded-md"
//               placeholder="Email"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="custom-input w-full px-3 py-2 border rounded-md"
//               placeholder="Password"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="custom-input w-full px-3 py-2 border rounded-md"
//               placeholder="Confirm Password"
//             />
//           </div>
//         </div>
//         <div className="mb-4">
//           <h6 className="flex items-center text-sm">
//             <input type="checkbox" className="mr-2" /> I've read and agree with
//             your Terms of Services
//           </h6>
//         </div>
//         <button
//           onClick={handleRegister}
//           className="register-button w-full py-2 bg-blue-600 text-white rounded-md"
//         >
//           Create Account<span className="ml-2">&#8594;</span>
//         </button>
//         <div className="text-center mt-4">
//           <span>OR</span>
//         </div>
//         {/* <button onClick={handleGoogleSignIn} className="google-signup-button mt-4 w-full py-2 border border-gray-300 rounded-md">
//           Sign Up with Google
//         </button> */}
//         <div className="flex justify-center items-center">
//           <GoogleLogin
//             onSuccess={(credentialResponse) => {
//               if (credentialResponse.credential) {
//                 const Responsedecoded = jwtDecode<JwtPayload & IPassCreditional>(
//                   credentialResponse.credential
//                 );
//                 // console.log(Responsedecoded);
//                 handleGoogleSignIn(Responsedecoded);
//               } else {
//                 console.error("No credential found");
//               }
//             }}
//             onError={() => {
//               console.log("Login Failed");
//             }}
//           />
//         </div>
//       </div>
//       <div className="register-image hidden lg:flex">
//         <img src={Signlogo} alt="Registration" className="h-full w-auto" />
//       </div>
//     </div>
//   );
// };

// export default Signin;

import React, { MouseEvent, useState } from "react";
import Signlogo from "../../assets/sigininlogo.png";
import logoPilot from "../../assets/Logo.png";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuUserCircle2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { SocialAuth, register } from "../../apis/auth";
// import { auth, provider } from "../utilities/firebase";
// import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/slices/employer.slice";
import { GoogleLogin } from "@react-oauth/google";
import RoleSelectionModal from "../roleSelect/RoleSelectionModal";

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

interface IPassCreditional {
  name: string;
  email: string;
}

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("candidate");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [googleCred, setGoogleCred] = useState<IPassCreditional | null>(null);

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

  const handleGoogleSignIn = (PassCreditional: IPassCreditional) => {
    setGoogleCred(PassCreditional);
    setIsModalOpen(true);
  };

  const handleRoleSelection = async (role: string) => {
    if (googleCred) {
      const socialAuth: ISocialAuth = {
        fullname: googleCred.name,
        username: googleCred.name.split(" ").join("").toLowerCase() + "01",
        email: googleCred.email,
        role: role,
      };
      console.log(socialAuth);

      // const userRole = prompt("Choose your role (employer/candidate)");
      // if (userRole && (userRole === "employer" || userRole === "candidate")) {
      //   const socialAuth: ISocialAuth = {
      //     fullname: PassCreditional.name,
      //     username: PassCreditional.name?.split(" ").join("").toLowerCase() + "01",
      //     email: PassCreditional.email,
      //     role: userRole,
      //   };
      //   console.log(socialAuth);

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
      console.error("Google credentials not found.");
    }
  };

  return (
    <div className="register-page flex justify-center items-center relative min-h-screen max-h-screen mb-16">
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
        <h1 className="create_account text-2xl font-bold mt-6">
          Create Account.
        </h1>
        <h4 className="already_account mt-2 text-sm">
          already have account?{" "}
          <span
            className="inline cursor-pointer text-blue-600"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </h4>
        <div className="account_selections mt-4">
          <h3 className="text-center text-lg">CREATE ACCOUNT AS A</h3>
          <div className="flex justify-center mt-2">
            <label
              className={`mr-4 p-2 border rounded-md cursor-pointer ${
                selectedType === "candidate"
                  ? "border-blue-600 bg-[#042852] text-white"
                  : "border-gray-300"
              }`}
              onClick={() => handleTypeSelection("candidate")}
            >
              <span className="checkbox-text flex items-center">
                <LuUserCircle2 className="h-full" /> Candidate
              </span>
            </label>
            <label
              className={`p-2 border rounded-md cursor-pointer ${
                selectedType === "employer"
                  ? "border-blue-600 bg-[#042852] text-white"
                  : "border-gray-300"
              }`}
              onClick={() => handleTypeSelection("employer")}
            >
              <span className="checkbox-text flex items-center">
                <HiOutlineBuildingOffice2 className="h-full" /> Employer
              </span>
            </label>
          </div>
        </div>
        <div className="all-align-set mt-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="custom-input w-full px-3 py-2 border rounded-md"
                placeholder="Full Name"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="custom-input w-full px-3 py-2 border rounded-md"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input w-full px-3 py-2 border rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-input w-full px-3 py-2 border rounded-md"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="custom-input w-full px-3 py-2 border rounded-md"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="mb-4">
          <h6 className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" /> I've read and agree with
            your Terms of Services
          </h6>
        </div>
        <button
          onClick={handleRegister}
          className="register-button w-full py-2 bg-blue-600 text-white rounded-md"
        >
          Create Account<span className="ml-2">&#8594;</span>
        </button>
        <div className="text-center mt-4">
          <span>OR</span>
        </div>
        {/* <button onClick={handleGoogleSignIn} className="google-signup-button mt-4 w-full py-2 border border-gray-300 rounded-md">
          Sign Up with Google
        </button> */}
        <div className="flex justify-center items-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const Responsedecoded = jwtDecode<JwtPayload & IPassCreditional>(
                  credentialResponse.credential
                );
                // console.log(Responsedecoded);
                handleGoogleSignIn(Responsedecoded);
              } else {
                console.error("No credential found");
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
      <div className="register-image hidden lg:flex">
        <img src={Signlogo} alt="Registration" className="h-full w-auto" />
      </div>
      <RoleSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectRole={handleRoleSelection}
      />
    </div>
  );
};

export default Signin;
