// import React from "react";
// import logoPilot from "../../../assets/Logo.png";
// import profilePic from "../../../assets/Ellipse 18.png";
// import { Link } from "react-router-dom";

// const Navbar: React.FC = () => {
//   const token: string | null = localStorage.getItem("Token");
//   return (
//     <>
//       <div className="navbar">
//         <div className="left-sections">
//           <Link to="/"> Home</Link>
//           <Link to="/find-job">Find Job</Link>
//           <Link to="/find-employer">Employers</Link>
//         </div>
//         <div className="right-sections">
//           <div className="contact-number">+1-23-232323</div>
//           <div className="language-select">English</div>
//         </div>
//       </div>
//       <div className="logo-navbar">
//         <div className="logo">
//           <img src={logoPilot} alt="logoofjobpilot" className="w-28" />
//         </div>
//         {token ? (
//           <div className="border-none verify">
//             <Link to='/candidate/user-dash' >
//             <img src={profilePic} alt="" />
//             </Link>
//           </div>
//         ) : (
//           <div className="signin">
//             <button>
//               <Link to="/signin">Sign In</Link>
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import logoPilot from "../../../assets/Logo.png";
import profilePic from "../../../assets/Ellipse 18.png";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token: string | null = localStorage.getItem("Token");

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md">
      {/* Mobile Menu Button */}
      <div className="md:hidden container mx-auto px-4 py-2 flex items-center justify-between">
        <img src={logoPilot} alt="logoofjobpilot" className="w-28" />
        <button
          className="text-gray-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="flex flex-col items-center py-4 border-b border-gray-200">
            <img src={logoPilot} alt="logoofjobpilot" className="w-28 mb-4" />
            {token ? (
              <Link to="/candidate/user-dash" className="mb-4">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
            ) : (
              <Link to="/signin">
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded border-2 border-transparent hover:bg-white hover:border-blue-400 hover:text-blue-600 transition duration-300">
                    Sign In
                  </button>
              </Link>
            )}
          </div>
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              to="/"
              className="text-gray-800 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/find-job"
              className="text-gray-800 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Find Job
            </Link>
            <Link
              to="/find-employer"
              className="text-gray-800 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Employers
            </Link>
            <div className="contact-number text-gray-800">+1-23-232323</div>
            <div className="language-select text-gray-800">English</div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex md:items-center md:justify-between md:w-full md:space-y-4 px-40 bg-[#f7f7f8]">
        {/* Upper Navigation Links */}
        <div className="flex space-x-4 py-2">
          <Link to="/" className="text-gray-800 hover:text-blue-600">
            Home
          </Link>
          <Link to="/find-job" className="text-gray-800 hover:text-blue-600">
            Find Job
          </Link>
          <Link
            to="/find-employer"
            className="text-gray-800 hover:text-blue-600"
          >
            Employers
          </Link>
        </div>
        <div className="flex space-x-4">
          <div className="contact-number text-gray-800">+1-23-232323</div>
          <div className="language-select text-gray-800">English</div>
        </div>
      </div>
      {/* Lower Part */}
      <div className="hidden md:flex md:px-40 flex-row items-center justify-between space-y-2 py-4">
        <img src={logoPilot} alt="logoofjobpilot" className="w-28" />
        {token ? (
          <Link to="/candidate/user-dash">
            <img
              src={profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        ) : (
          <button className="tmt-4 px-4 py-2 bg-blue-600 text-white rounded border-2 border-transparent hover:bg-white hover:border-blue-400 hover:text-blue-600 transition duration-300">
            <Link to="/signin">Sign In</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
