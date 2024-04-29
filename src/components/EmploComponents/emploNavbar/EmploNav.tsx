import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { GetSpecificCompany } from "../../../apis/employer";
import Dlogo from "../../../assets/logo_company.png";
import { Link } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { getAllNotification } from "../../../apis/chat";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "antd";

interface NavBarProps {
  logo: string;
  notificationIcon: string;
}

const NavBar: React.FC<NavBarProps> = ({ logo, notificationIcon }) => {
  const [empInfo, setEmpInfo] = useState<{
    logo: string;
  }>({
    logo: "",
  });
  const [notifyData, setnotifyData] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const Employer: any = useSelector((state: RootState) => {
    return state.employer.currentEmployer;
  });
  console.log(Employer);

  const HandleShowDetail = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (Employer?._id) {
      const fetchData = async () => {
        const response = await getAllNotification(Employer?._id);
        console.log(response);
        setnotifyData(response);
      };
      fetchData();
    }
  }, [Employer?._id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetSpecificCompany(Employer?._id);
      console.log(response.Company);
      if (response.Company) {
        setEmpInfo(response.Company);
      }
    };
    fetchData();
  }, [Employer?._id]);

  console.log(notifyData);

  return (
    <>
      <nav className="emploClass">
        <div className="emploClass-left">
          <img src={logo} alt="Logo" className="emploClass-logo" />
        </div>
        <div className="emploClass-right">
          <Badge count={notifyData.length} style={{ backgroundColor: 'green', position:"relative" , top:"-15px" , left:"30px" }}/>
          <img
            src={notificationIcon}
            onClick={() => {
              HandleShowDetail();
            }}
            alt="Notifications"
            className="emploClass-notification-icon cursor-pointer"
          />
          <Link to={`/message/${Employer?._id}`}>
            <MdOutlineMessage className="text-3xl ml-2" />
          </Link>
          {empInfo.logo ? (
            <img
              src={empInfo.logo}
              alt="User Profile"
              className="emploClass-user-profile-image rounded-full"
            />
          ) : (
            <img
              src={Dlogo}
              alt="Default Logo"
              className="emploClass-user-profile-image rounded-full"
            />
          )}
        </div>
      </nav>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-75 outline-none focus:outline-none">
          <div className="relative w-1/3 max-w-5xl mx-auto">
            {/* Modal content */}
            <div className="modal-content">
              {/* Modal header */}
              <div className="relative flex items-center justify-between p-5 bg-white border-b border-gray-300 rounded-tl-lg rounded-tr-lg">
                <h3 className="text-lg font-semibold">
                  Notifications{" "}
                  <BsChatLeftDotsFill style={{ display: "inline" }} />
                </h3>
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
