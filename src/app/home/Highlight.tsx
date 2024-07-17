// import React from 'react';
// import logoBanner from '../../assets/Illustration.png';

// const Highlight:React.FC = () => {
//     return (
//         <div className="banner-section">
//           <div className="left-section">
//             <div className="text-content">
//               <h2>Find the job of your <br /> dreams, interest & skills.</h2>
//               <p>Aliquam vitae turpis in diam convallis finibus in at risus. Nullam <br />  in scelerisque leo, eget sollicitudin velit vestibulum.</p>
//             </div>
//             <div className="search-inputs">
//               <input type="text" className='input-search one' placeholder="Job title, keyword, etc." />
//               <input type="text" className='input-search' placeholder="Your location" />
//               <button>Find job</button>
//             </div>
//             <p className='mt-3 text-xs pl-3 font-medium ring-gray-500'>suggestion : Desinger,Programmer,Animation</p>
//           </div>
//           <div className="right-section">
//             <img className='logobanner' src={logoBanner} alt="" />
//           </div>
//         </div>
//       );

// }

// export default Highlight

import React from "react";
import logoBanner from "../../assets/Illustration.png";

const Highlight: React.FC = () => {
  return (
    <div className="banner-section flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between p-4 lg:px-20">
      <div className="left-section lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
        <div className="text-content">
          <h2 className="text-xl !sm:text-lg !md:text-xl !lg:text-2xl font-bold mb-2 leading-tight">
            Find the job of your <br className="hidden md:block" /> dreams,
            interest & skills.
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam{" "}
            <br className="hidden md:block" /> in scelerisque leo, eget
            sollicitudin velit vestibulum.
          </p>
        </div>
        <div className="search-inputs flex flex-col lg:flex-row lg:space-x-4 mb-4">
          <input
            type="text"
            className="input-search mb-4 lg:mb-0 w-full lg:w-[calc(50%-0.5rem)] px-4 py-2 border rounded"
            placeholder="Job title, keyword, etc."
          />
          <input
            type="text"
            className="input-search mb-4 lg:mb-0 w-full lg:w-[calc(50%-0.5rem)] px-4 py-2 border rounded"
            placeholder="Your location"
          />
          <button className="w-full lg:w-auto bg-blue-500 text-white py-2 px-4 rounded lg:ml-4 mt-2 lg:mt-0">
            Find job
          </button>
        </div>

        <p className="text-xs sm:text-sm md:text-base lg:text-base font-medium text-gray-600">
          suggestion : Designer, Programmer, Animation
        </p>
      </div>
      <div className="hidden lg:flex lg:w-1/2 lg:justify-end pt-4 lg:pt-0">
        <img
          className="logobanner w-full max-w-xs lg:max-w-md"
          src={logoBanner}
          alt="Logo Banner"
        />
      </div>
    </div>
  );
};

export default Highlight;
