import React from 'react';

interface NavBarProps {
  logo: string;
  notificationIcon: string;
  userProfileImage: string;
}

const NavBar: React.FC<NavBarProps> = ({ logo, notificationIcon, userProfileImage }) => {
  return (
    <nav className="emploClass">
      <div className="emploClass-left">
        <img src={logo} alt="Logo" className="emploClass-logo" />
      </div>
      <div className="emploClass-right">
        <img src={notificationIcon} alt="Notifications" className="emploClass-notification-icon" />
        <img src={userProfileImage} alt="User Profile" className="emploClass-user-profile-image" />
      </div>
    </nav>
  );
};

export default NavBar;
