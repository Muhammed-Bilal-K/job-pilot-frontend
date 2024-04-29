import React from "react";
import candidate from '../../assets/candidate.jpg';
import employer from '../../assets/employer.jpg';

const BecomePart: React.FC = () => {
  return (
    <>
      <div className="for-register-candidate-emplo px-40 py-5 flex justify-center items-center gap-10">
        <div className="flex px-5 py-10 rounded-2xl" style={{backgroundColor:"#e1f1ff"}}>
          <div>
            <h1 className="font-bold text-3xl">Become a Candidate</h1>
            <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className="px-5 py-3 bg-blue-200 mt-4 rounded-lg">Register Now</button>
          </div>
          <div>
            <img src={candidate} style={{width:"230px"}} className="rounded-xl" alt="the candidates" />
          </div>
        </div>
        <div className="flex px-5 py-10 rounded-2xl" style={{backgroundColor:"#e1f1ff"}}>
          <div>
            <h1 className="font-bold text-3xl">Become a Employer</h1>
            <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className="px-5 py-3 bg-blue-200 mt-4 rounded-lg">Register Now</button>
          </div>
          <div>
            <img src={employer} style={{width:"200px"}} className="rounded-xl" alt="the candidates" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomePart;
