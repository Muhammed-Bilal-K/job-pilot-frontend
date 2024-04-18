import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { currentUser } from "../../../apis/auth";
import { LoginInSuccess } from "../../../redux/slices/user.slice";
import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";

interface NavBarProps {
  logo: string;
  notificationIcon: string;
  userProfileImage: string;
}

const NavBar: React.FC<NavBarProps> = ({
  logo,
  notificationIcon,
  userProfileImage,
}) => {
  const [candidate, setCandidate] = useState("");
  const dispatch = useDispatch();
  const User: any = useSelector((state: RootState) => {
    return state.user.currentUser;
  });
  console.log(User);

  useEffect(() => {
    if (User) {
      setCandidate(User?.fullname);
    }
  }, [candidate]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && !candidate) {
      const fetchUserData = async (token: string) => {
        try {
          const user = await currentUser(token);
          dispatch(LoginInSuccess(user.data.currentUser));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(token);
    }
  }, [candidate]);

  return (
    <nav className="emploClass">
      <div className="emploClass-left">
        <img src={logo} alt="Logo" className="emploClass-logo" />
      </div>
      <div className="emploClass-right">
        <img
          src={notificationIcon}
          alt="Notifications"
          className="emploClass-notification-icon"
        />
        <Link to={`/message/${User?._id}`}>
          < MdOutlineMessage className="text-3xl ml-2"/>
        </Link>
        <img
          src={userProfileImage}
          alt="User Profile"
          className="emploClass-user-profile-image"
        />
      </div>
    </nav>
  );
};

export default NavBar;
