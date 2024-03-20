import React, { useState, MouseEvent } from "react";
import loginlogo from "../../assets/loginlogo.png";
import logoPilot from "../../assets/Logo.png";
import { message } from "antd";
import { UserByEmail } from '../../apis/auth';
import { useNavigate } from "react-router-dom";

interface InputValuesEmail {
  email: string | undefined;
}

const ForgetPass: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const handleForget = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log(email);
      if(email == '' ){
        message.info("Invalid Email!");
        return ;
      } 
      const newUserRegi: InputValuesEmail = {
        email: email,
      };
      const res =await UserByEmail(newUserRegi);
      console.log(res.data);
      
      if(res.data.message == "Email Found Successfully!"){
        message.success(res.data.message);
        setTimeout(()=>{
          navigate('/forgetform',  { state: { email: res.data.email } });
        },1000);
      }

    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="register-page flex justify-evenly items-center relative">
        <div className="register-form mt-20">
          <div className="jobpilot-logo absolute top">
            <div className="job-logo">
              <img src={logoPilot} alt="login" className="login login-page" />
            </div>
          </div>
          <div className="forget-pass">
            <h1 className="create_account">Forget Password.</h1>
            <h4 className="already_account">Go back to Sign In</h4>
          </div>
          <div className="forget-email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input custom-width-forget"
              placeholder="Email Address"
            />
          </div>
          <button className="register-button" onClick={handleForget}>
            Reset Password<span className="text"> &#8594;</span>
          </button>
        </div>
        <div className="register-image">
          <img className="" src={loginlogo} alt="Registration" />
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
