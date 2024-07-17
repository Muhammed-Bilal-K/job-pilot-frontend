import React from "react";
import { useNavigate } from "react-router-dom";
import Image404 from "../assets/robot-404-error-errors.svg";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-10 md:px-20">
      <div className="text-center md:text-left md:w-1/2 p-4">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4">UH OH! You're lost.</h2>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the  button below to go back to the
          homepage.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded border-2 border-transparent hover:bg-white hover:border-blue-400 hover:text-blue-600 transition duration-300"
          onClick={goToHomePage}
        >
          HOME
        </button>
      </div>
      <div className="md:w-1/2 p-4 flex justify-center">
        <img src={Image404} alt="404 Error" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default NotFoundPage;
