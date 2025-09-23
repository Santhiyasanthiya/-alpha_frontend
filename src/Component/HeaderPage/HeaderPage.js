import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contex/UserContext';
import './HeaderPage.css'; 

const HeaderPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    setUsername(""); 
    closeMenu();
    navigate("/");
  };

  return (
    <header className="medi_head_header shadow-sm">
      <div className="container-fluid medi_head_container d-flex justify-content-between align-items-center py-2 px-3">
        
        {/* Logo */}
        <div className="medi_head_logo">
          <Link to="/" onClick={closeMenu}>
            <img 
              src="https://res.cloudinary.com/dmv2tjzo7/image/upload/v1746264888/dsi64irjwtabuwhbnand.png" 
              alt="Logo" 
              className="medi_head_logoimg" 
            />
          </Link>
        </div>

        {/* Desktop view */}
        {username ? (
          <div className="d-flex  d-none d-md-flex">
            <span className="medi_head_user fw-bold" onClick={() => navigate("/signin")}>{username}</span>
            <img
              src="https://res.cloudinary.com/dk50cmtps/image/upload/v1758538923/logout_4034229_sstdnl.png"
              alt="Logout"
              className="cursor-pointer"
              onClick={handleLogout}
              style={{ width: "28px", height: "28px", marginLeft: "15px",}}
            />
          </div>
        ) : (
          <Link to="/alpha_register" className="d-none d-md-block medi_head_inlog">
            Sign In
          </Link>
        )}

        {/* Mobile view username on right */}
       <div className="d-flex d-md-none align-items-center gap-2">
  {username && (
    <span className="medi_head_user fw-bold">{username}</span>
  )}
  <button className="medi_head_menu_btn" onClick={toggleMenu}>☰</button>
</div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="medi_head_mobile_nav d-md-none text-center py-2">
          <Link 
            to="/about_page" 
            className="medi_head_link_about d-block py-1" 
            onClick={closeMenu}
          >
            About
          </Link>

          {/* Only Logout text on mobile menu */}
          {username && (
            <div className="mt-2">
              <span
                className="medi_head_logout_text"
                onClick={handleLogout}
                style={{ cursor: "pointer", color: "#ff4d4f", fontWeight: "bold" }}
              >
                Logout
              </span>
            </div>
          )}
          
          {!username && (
            <Link 
              to="/alpha_register" 
              className="medi_head_link_about d-block py-1"
              onClick={closeMenu}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderPage;
