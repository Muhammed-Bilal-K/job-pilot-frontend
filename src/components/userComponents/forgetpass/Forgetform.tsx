import React, { useState } from "react";
import logoPilot from "../../../assets/Logo.png";
import { useLocation } from "react-router-dom";
import { message } from "antd";
import { UpdatePassByEmail } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";

interface InputPass {
  email : string | undefined;
  npassword: string | undefined;
}

const Forgetform: React.FC = () => {
  const location = useLocation();
  const email = location.state.email;
  const [npassword, setnPassword] = useState<string>("");
  const [cnpassword, setcnPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleChangePass = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (cnpassword === "" || npassword === "") {
        message.info("Input field can't be empty");
        return;
      }
  
      if (npassword.length < 4) {
        message.info("Minimum length should be 4");
        return;
      }
  
      if (cnpassword !== npassword) {
        message.info("Password doesn't Match");
        return;
      }
  
      const userPassChange: InputPass = {
        email: email,
        npassword: npassword,
      };
  
      const res = await UpdatePassByEmail(userPassChange);

      if (res.data.message === "Password Updated Successfully!") {
        message.success(res.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };  

  return (
    <>
      <div className="email-verification-page">
        <div className="logo-section">
          <img src={logoPilot} alt="Website Logo" />
        </div>
        <h1 className="font-bold text-3xl">Forget Password</h1>
        <div className="message-section">
          <p>You can reset password form {email}.</p>
          <div className="input-section">
            <input
              placeholder="New Password"
              type="password"
              value={npassword}
              onChange={(e) => setnPassword(e.target.value)}
            />
          </div>
          <div className="input-section">
            <input
              type="password"
              value={cnpassword}
              onChange={(e) => setcnPassword(e.target.value)}
              placeholder="Confirm New Password"
            />
          </div>
          <div className="button-section">
            <button onClick={handleChangePass} className="btn-padding">
              Reset Password<span className="text"> &#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgetform;
