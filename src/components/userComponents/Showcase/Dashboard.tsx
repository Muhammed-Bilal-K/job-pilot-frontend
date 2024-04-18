import React, { useEffect, useState } from 'react'
import { FaRegBookmark } from "react-icons/fa";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { ShowLeftComponent } from './ShowLeftComo'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { LoginInSuccess } from '../../../redux/slices/user.slice';
import { currentUser } from '../../../apis/auth';

const Dashboard:React.FC = () => {
  const [candidate, setCandidate] = useState("");
  const dispatch =  useDispatch();
  const User : any = useSelector((state : RootState) => {
    return state.user.currentUser;
  })
  console.log(User);
  
  useEffect(() => {
    if (User) {
      setCandidate(User?.fullname);
    }
  }, [candidate]);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token && !candidate) {
      const fetchUserData = async (token: string) => {
        try {
          const user = await currentUser(token);
          dispatch(LoginInSuccess(user.data.currentUser));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData(token);
    }
  }, [candidate]);

  return (
    <div className="showcase">
    <ShowLeftComponent/>
    <div className='showright'>
        <div className="top-info capitalize">Hello, {User?.fullname}</div>
        <div className="bottom-info">
          <div className="bottom-left">
            <div className="job-applied-info">
              <div className="job-applied-count"><p>
                235</p></div>
              <div className="job-applied-title"><h4>Open Jobs</h4></div>
            </div>
            <div className="icons">
                <PiSuitcaseSimpleBold className='icon-size' />
            </div>
          </div>
          <div className="bottom-right">
            <div className="favorite-candidate-info">
              <div className="favorite-candidate-count"><p>234</p></div>
              <div className="favorite-candidate-title"><h4>Favorite Candidates</h4></div>
            </div>
            <div className="icons">
              <FaRegBookmark className='icon-size text-orange-300'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard