import React, { useState } from 'react';
import loginlogo from '../../assets/loginlogo.png';
import logoPilot from '../../assets/Logo.png';
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
import { login } from '../../apis/auth';

interface InputValues {
  email: string | undefined;
  password: string | undefined;
}

const Login : React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
    try {
      if(email == '' || password == ''){
        message.info("Input can't empty!");
        return ;
      }
      const UserLogin:InputValues = {
        email: email,
        password: password,
      };
      const res =await login(UserLogin);
      console.log(res.data);
      if(res.data.message == "Account logined successfully"){
        message.success(res.data.message);
        localStorage.setItem("VerifyToken", res.data.token);
        setTimeout(()=>{
          navigate('/');
        },1000);
      }
    } catch (error) {
      
    }

  };

  const handleGoogleSignUp = () => {
    
  };


  return (
    <>
      <div className="register-page flex justify-center items-center relative">
        <div className="register-form mt-20">
          <div className="jobpilot-logo absolute top">
            <div className="job-logo">
              <img src={logoPilot} alt="login" className="login login-page" />
            </div>
          </div>
          <h1 className="create_account">Sign In.</h1>
          <h4 className="already_account">Don't have an account? <h2 className="inline cursor-pointer" onClick={()=> navigate('/signin')}>Sign In</h2></h4>
          <div className="all-aligh-set">
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
            <p onClick={() => navigate('/forgetpass')} className='cursor-pointer flex justify-end'>Forget Password</p>
          </div>
          <div>
            <h6 className="mt-3 term-service"><input type="checkbox" name="" id="" />  I've read and agree with your Terms of Services</h6>
          </div>
          <button onClick={handleRegister} className="register-button">Sign In<span className="text">  &#8594;</span></button>
          <div className="text-center">
          <span>OR</span>
          </div>
          <button onClick={handleGoogleSignUp} className="google-signup-button">Sign Up with Google</button>
        </div>
        <div className="register-image">
          <img className="" src={loginlogo} alt="Registration" />
        </div>
      </div>
    </>
  );
}

export default Login;