import React from "react";
import candidate from '../../assets/candidate.jpg';
import employer from '../../assets/employer.jpg';
import { useNavigate } from "react-router-dom";

const BecomePart: React.FC = () => {
  const navigate = useNavigate();
  
  const handleMoveRegister = () => {
    navigate('/login');
  }

  return (
    <div className="px-4 py-5 flex flex-col lg:grid lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col items-center p-5 bg-[#e1f1ff] rounded-2xl mb-5 lg:mb-0">
        <div className="text-center">
          <h1 className="font-bold text-2xl lg:text-3xl">Become a Candidate</h1>
          <p className="text-sm lg:text-base mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          <button className="px-4 py-2 lg:px-5 lg:py-3 mb-5 bg-blue-200 mt-4 rounded-lg" onClick={handleMoveRegister}>Register Now</button>
        </div>
        <div className="mt-4 lg:mt-0 flex justify-center">
          <img src={candidate} className="w-1/2 lg:w-1/2 rounded-xl" alt="the candidates" />
        </div>
      </div>
      <div className="flex flex-col items-center p-5 bg-[#e1f1ff] rounded-2xl">
        <div className="text-center">
          <h1 className="font-bold text-2xl lg:text-3xl">Become an Employer</h1>
          <p className="text-sm lg:text-base mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          <button className="px-4 py-2 lg:px-5 lg:py-3 mb-5  bg-blue-200 mt-4 rounded-lg" onClick={handleMoveRegister}>Register Now</button>
        </div>
        <div className="mt-4 lg:mt-0 flex justify-center">
          <img src={employer} className="w-1/2 lg:w-1/2 rounded-xl" alt="the employers" />
        </div>
      </div>
    </div>
  );
};

export default BecomePart;
