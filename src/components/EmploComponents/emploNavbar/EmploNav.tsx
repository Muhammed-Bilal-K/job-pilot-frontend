import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { GetSpecificCompany } from "../../../apis/employer";
import Dlogo from "../../../assets/logo_company.png";
import { Link } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";

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
  const Employer: any = useSelector((state: RootState) => {
    return state.employer.currentEmployer;
  });
  console.log(Employer);

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
        <Link to={`/message/${Employer?._id}`}>
          < MdOutlineMessage className="text-3xl ml-2"/>
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
  );
};

export default NavBar;
