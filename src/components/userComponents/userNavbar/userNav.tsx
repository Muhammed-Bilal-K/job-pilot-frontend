import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { currentUser } from "../../../apis/auth";
import { LoginInSuccess } from "../../../redux/slices/user.slice";
import { MdOutlineMessage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getAllNotification } from "../../../apis/chat";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "antd";


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
  const [candidate, setCandidate] = useState<string>("");
  const [notifyData, setnotifyData] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User: any = useSelector((state: RootState) => {
    return state.user.currentUser;
  });
  console.log(User);

  const HandleShowDetail = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (User) {
      setCandidate(User?.fullname);
    }
  }, [candidate]);

  useEffect(() => {
    if (User?._id) {
      const fetchData = async () => {
        const response = await getAllNotification(User?._id);
        console.log(response);
        setnotifyData(response);
      };
      fetchData();
    }
  }, [User?._id]);

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
    <>
      <nav className="emploClass">
        <div className="emploClass-left">
          <img
            onClick={()=>{
              navigate('/')
            }}
            src={logo}
            alt="Logo"
            className="emploClass-logo cursor-pointer"
          />
        </div>
        <div className="emploClass-right">
        <Badge count={notifyData.length} style={{ backgroundColor: 'green', position:"relative" , top:"-15px" , left:"30px" }}/>
          <img
          onClick={() => {
            HandleShowDetail();
          }}
            src={notificationIcon}
            alt="Notifications"
            className="emploClass-notification-icon cursor-pointer"
          />
          <Link to={`/message/${User?._id}`}>
            <MdOutlineMessage className="text-3xl ml-2" />
          </Link>
          <img
            src={userProfileImage}
            alt="User Profile"
            className="emploClass-user-profile-image"
          />
        </div>
      </nav>
      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-75 outline-none focus:outline-none">
            <div className="relative w-1/3 max-w-5xl mx-auto">
              {/* Modal content */}
              <div className="modal-content">
                {/* Modal header */}
                <div className="relative flex items-center justify-between p-5 bg-white border-b border-gray-300 rounded-tl-lg rounded-tr-lg">
                  <h3 className="text-lg font-semibold">User Details</h3>
                  <button
                    className="absolute top-0 right-0 p-2 mt-2 mr-2 text-sm font-bold text-gray-500 transition-colors duration-150 hover:text-gray-700"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                {/* Modal body */}
                <div className="relative p-6 bg-white">
                  {/* Modal body content */}
                  {notifyData.map((message: {
                  createdAt: string; user_id: { username: string }; message: string }, index: React.Key) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-xl py-2 my-1 hover:bg-blue-100"
                  >
                    <div
                      className="flex"
                      style={{ justifyContent: "space-around" }}
                    >
                      <div>
                        <h2>
                          <span className="capitalize text-lg font-semibold">
                            {message?.user_id?.username}
                          </span>
                        </h2>
                        <p className="capitalize">{message?.message}</p>{" "}
                        {/* Display the message content */}
                      </div>
                      <div style={{ fontSize: "12px" }}>
                        <span className="font-extralight">
                          New message{" "}
                          <BsChatLeftDotsFill style={{ display: "inline" }} />
                        </span>
                        <p>{formatDistanceToNow(new Date(message.createdAt),{addSuffix: true})}</p>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default NavBar;
