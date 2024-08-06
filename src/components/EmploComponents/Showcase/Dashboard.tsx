import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { ShowLeftComponent } from "./ShowLeftComo";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { currentUser } from "../../../apis/auth";
import { signInSuccess } from "../../../redux/slices/employer.slice";
import { useDispatch } from 'react-redux';

const Dashboard: React.FC = () => {
  const [employer, setEmployer] = useState("");
  const dispatch =  useDispatch();
  const Employer : any = useSelector((state : RootState) => {
    return state.employer.currentEmployer;
  });
  
  useEffect(() => {
    if (Employer) {
      setEmployer(Employer.fullname);
    }
  }, [Employer]);

  useEffect(() => {
    const token = localStorage.getItem('Emplo');
    if (token && !employer) {
      const fetchUserData = async (token: string) => {
        try {
          const user = await currentUser(token);
          dispatch(signInSuccess(user.data.currentUser));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData(token);
    }
  }, [employer]);

  localStorage.setItem("Company", employer);
  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright capitalize">
        <div className="top-info">
          Hello, {employer ? employer : "processing..."}
        </div>
        <div className="bottom-info">
          <div className="bottom-left">
            <div className="job-applied-info">
              <div className="job-applied-count">
                <p>235</p>
              </div>
              <div className="job-applied-title">
                <h4>Open Jobs</h4>
              </div>
            </div>
            <div className="icons">
              <PiSuitcaseSimpleBold className="icon-size" />
            </div>
          </div>
          <div className="bottom-right">
            <div className="favorite-candidate-info">
              <div className="favorite-candidate-count">
                <p>234</p>
              </div>
              <div className="favorite-candidate-title">
                <h4>Favorite Candidates</h4>
              </div>
            </div>
            <div className="icons">
              <FaRegBookmark className="icon-size text-orange-300" />
            </div>
          </div>
        </div>
      <div>
      <h3 className="mt-5 text-center text-red-800 capitalize text-xl">
              First you need to fill in all the information about yourself in <br />
              the <span className="underline text-green-900">settings</span> &#8594; <span className="underline text-green-900">Company Info</span> and <span className="underline text-green-900">Founding Info</span> , then you can post job!
            </h3>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
