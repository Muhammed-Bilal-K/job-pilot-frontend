import React, { useEffect, useState } from "react";
import logoPilot from '../../assets/Logo.png';
import { message } from "antd";
import { activeUser } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

interface OtpValues {
  activation_token: string | undefined;
  activation_code: string | undefined; 
}

const Verification: React.FC = () => {
    const [otp, setOtp] = useState('');
    const [showResend, setShowResend] = useState(false);
    const [countdown, setCountdown] = useState(180);
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setInterval(() => {
        if (countdown > 0) {
          setCountdown(prevCountdown => prevCountdown - 1);
          setShowResend(true);
        } else {
          setShowResend(false);
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [countdown]);

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        console.log(otp);
        if(otp == '' || otp.length > 4){
          message.info("Invalid Otp!");
          return ;
        }
        const token = localStorage.getItem("VerifyToken");
        const newUserVerification: OtpValues = {
          activation_code : otp,
          activation_token : token!
        };

        const res =await activeUser(newUserVerification);
        console.log(res.data);
        if (res.data.message == 'Account activated successfully') {
          message.success("Account activated successfully");
          setTimeout(()=>{
            navigate('/login');
          },1000);
        }
        
      } catch (error) {
        
      }
    }

    const handleResend = () => {
      setShowResend(true);
      setCountdown(180); 
    }

  return (
    <>
      <div className="email-verification-page">
        <div className="logo-section">
          <img src={logoPilot} alt="Website Logo" />
        </div>
        <h1 className="font-bold text-3xl">Email Verification</h1>
        <div className="message-section">
          <p>
            We’ve sent an email verification sample@gmail.com to verify your <br />
            email address and activate your account.
          </p>
        <div className="input-section">
          <input type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Verification Code" />
        </div>
        <div className="button-section">
          <button onClick={handleRegister}>Verify My Account <span className="text">&#8594;</span></button>
        </div>
        <div className="resend-section">
            {showResend ?  <p>Resend OTP in {countdown} seconds</p> : <p onClick={handleResend}>Didn’t receive any code! Resend</p>}
        </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
