import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import { FaSearchPlus } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

const JobWork: React.FC = () => {
  return (
    <>
      <div className="text-center pt-16" style={{ backgroundColor: "#f1f2f4" }}>
        <h2 className="capitalize font-bold text-3xl">How jobpilot work</h2>
      </div>
      <div className="jobWork-box-container pb-16">
        <div className="jobWork-box text-center">
          <div className="text-center">
            <AiOutlineUserAdd
              style={{ margin: "0px auto" }}
              className="react-icon"
            />
          </div>
          <h2 className="font-bold">Create account</h2>
          <p>Aliquam facilisis egestas sapien, nec tempor leo tristique at.</p>
        </div>
        <div className="jobWork-box text-center">
          <SlCloudUpload
            style={{ margin: "0px auto" }}
            className="react-icon"
          />
          <h2 className="font-bold">Upload CV/Resume</h2>
          <p>Phasellus quis eleifend ex. Morbi nec fringilla nibh.</p>
        </div>
        <div className="jobWork-box text-center">
          <FaSearchPlus style={{ margin: "0px auto" }} className="react-icon" />
          <h2 className="font-bold">Find suitable job</h2>
          <p>
            Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales
          </p>
        </div>
        <div className="jobWork-box text-center">
          <MdOutlineVerified
            style={{ margin: "0px auto" }}
            className="react-icon"
          />
          <h2 className="font-bold">Apply job</h2>
          <p>
            Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales
            purus.
          </p>
        </div>
      </div>
    </>
  );
};

export default JobWork;
