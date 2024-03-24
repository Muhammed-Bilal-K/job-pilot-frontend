import React, { useState } from 'react';
import loginlogo from '../../assets/loginlogo.png';
import logoPilot from '../../assets/Logo.png';
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
import { LoginByAdmin } from '../../apis/auth';

interface InputValues {
  email: string | undefined;
  password: string | undefined;
}

const AdminLogin : React.FC = () => {
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
      if(email.trim() == '' || password.trim() == ''){
        message.info("Input can't empty!");
        return ;
      }
      const AdminLogin:InputValues = {
        email: email,
        password: password,
      };
      const res =await LoginByAdmin(AdminLogin);
      console.log(res.data);
      if(res.data.message == "Account logined successfully"){
        message.success(res.data.message);
        localStorage.setItem("AdminToken", res.data.token);
       setTimeout(()=>{
        navigate('/admin/admin-dash');
       },1000)
      }
    } catch (error: any) {
      message.error(error.response.data.message);
    }
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
          <h1 className="create_account">Login.</h1>
          <h1>Hi , Admin</h1>
          <div className="all-aligh-set mb-0">
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
          </div>
          <div className='invisible'>
            <div className='w-96'></div>
          </div>
          <button onClick={handleRegister} className="register-button mt-0">Sign In<span className="text">  &#8594;</span></button>
        </div>
        <div className="register-image">
          <img className="" src={loginlogo} alt="Registration" />
        </div>
      </div>
    </>
  );
}

export default AdminLogin;