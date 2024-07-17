// import React from "react";
// import { AiOutlineUserAdd } from "react-icons/ai";
// import { SlCloudUpload } from "react-icons/sl";
// import { FaSearchPlus } from "react-icons/fa";
// import { MdOutlineVerified } from "react-icons/md";

// const JobWork: React.FC = () => {
//   return (
//     <>
//       <div className="text-center pt-16" style={{ backgroundColor: "#f1f2f4" }}>
//         <h2 className="capitalize font-bold text-3xl">How jobpilot work</h2>
//       </div>
//       <div className="jobWork-box-container pb-16">
//         <div className="jobWork-box text-center">
//           <div className="text-center">
//             <AiOutlineUserAdd
//               style={{ margin: "0px auto" }}
//               className="react-icon"
//             />
//           </div>
//           <h2 className="font-bold">Create account</h2>
//           <p>Aliquam facilisis egestas sapien, nec tempor leo tristique at.</p>
//         </div>
//         <div className="jobWork-box text-center">
//           <SlCloudUpload
//             style={{ margin: "0px auto" }}
//             className="react-icon"
//           />
//           <h2 className="font-bold">Upload CV/Resume</h2>
//           <p>Phasellus quis eleifend ex. Morbi nec fringilla nibh.</p>
//         </div>
//         <div className="jobWork-box text-center">
//           <FaSearchPlus style={{ margin: "0px auto" }} className="react-icon" />
//           <h2 className="font-bold">Find suitable job</h2>
//           <p>
//             Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales
//           </p>
//         </div>
//         <div className="jobWork-box text-center">
//           <MdOutlineVerified
//             style={{ margin: "0px auto" }}
//             className="react-icon"
//           />
//           <h2 className="font-bold">Apply job</h2>
//           <p>
//             Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales
//             purus.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobWork;


import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import { FaSearchPlus } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

const JobWork: React.FC = () => {
  return (
    <>
      <div className="text-center pt-16 bg-gray-100">
        <h2 className="capitalize font-bold text-1xl sm:text-1xl md:text-2xl lg:text-3xl">
          How jobpilot works
        </h2>
      </div>
      <div className="jobWork-box-container pb-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="jobWork-box">
            <div className="text-center mb-4">
              <AiOutlineUserAdd className="react-icon mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
            </div>
            <h2 className="font-bold text-lg sm:text-xl md:text-1xl lg:text-2xl">Create account</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Aliquam facilisis egestas sapien, nec tempor leo tristique at.
            </p>
          </div>
          <div className="jobWork-box">
            <div className="text-center mb-4">
              <SlCloudUpload className="react-icon mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
            </div>
            <h2 className="font-bold text-lg sm:text-xl md:text-1xl lg:text-2xl">Upload CV/Resume</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Phasellus quis eleifend ex. Morbi nec fringilla nibh.
            </p>
          </div>
          <div className="jobWork-box">
            <div className="text-center mb-4">
              <FaSearchPlus className="react-icon mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
            </div>
            <h2 className="font-bold text-lg sm:text-xl md:text-1xl lg:text-2xl">Find suitable job</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales
            </p>
          </div>
          <div className="jobWork-box">
            <div className="text-center mb-4">
              <MdOutlineVerified className="react-icon mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
            </div>
            <h2 className="font-bold text-lg sm:text-xl md:text-1xl lg:text-2xl">Apply job</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobWork;
