import React from "react";
import { BsBuildingsFill, BsCalendar2Range } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

const SettingNavbar: React.FC = () => {
  return (
    <>
      <div className="font-semibold text-3xl pl-2 pt-4">Settings</div>
      <div>
        <div className="flex items-center content-start mt-3 border-b-2">
          <Link to="/candidate/user-dash/settings" className="">
            <div className="flex items-center px-7 py-3 btn-over-sett">
              <div>
                <BsBuildingsFill className="showcase-icons" />
              </div>
              <div>
                <span className="ml-5">User Info</span>
              </div>
            </div>
          </Link>
          <Link to="/candidate/user-dash/user-settings" className="">
            <div className="flex items-center px-7 py-3 btn-over-sett">
              <div>
                <IoSettingsOutline className="showcase-icons" />
              </div>
              <div>
                <span className="ml-5">Settings</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SettingNavbar;
