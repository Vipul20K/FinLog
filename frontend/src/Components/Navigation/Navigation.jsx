
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import avatar from "../../img/avatar2.png";
import { signout } from "../../utils/Icons.jsx";
import { menuItems } from "../../utils/menuItems.jsx";
import { useGlobalContext } from "../../context/globalContext";
import { FaWhatsapp } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const { user, logoutUser } = useGlobalContext();

  const handleSignOut = () => {
    logoutUser();
    navigate("/login");
    console.log("user signed out");
  };

  return (
    <nav className="nav-container">
    
      <div className="user-con">
        <img
          src={avatar}
          alt="user-avatar"
          onClick={() => navigate("/profile")}
        />
        <div className="text">
          <h2>{user?.name?.split(" ")[0] || "User"}</h2>
        </div>

        <button
          className="connect-wapp-btn"
          onClick={() => navigate("/profile")}
        >
          Connect
          <FaWhatsapp className="icon" />
        </button>
      </div>

    
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>

   
      <div className="bottom-nav">
        <li onClick={handleSignOut} style={{ cursor: "pointer" }}>
          {signout} Sign Out
        </li>
      </div>
    </nav>
  );
}

export default Navigation;
