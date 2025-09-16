import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contex/UserContext';
import './HeaderPage.css'; 

const HeaderPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    setUsername(""); 
    closeMenu();
    navigate("/")
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

        {username ? (
          <div className="d-flex align-items-center gap-3">
            <span className="medi_head_user fw-bold" onClick={()=>navigate("/signin")}>{username}</span>
            
            {/* Desktop Logout Icon */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
              alt="Logout"
              className="medi_head_logout_icon d-none d-md-block"
              onClick={handleLogout}
              style={{ cursor: "pointer", width: "28px", height: "28px" }}
            />
          </div>
        ) : (
          // Sign In only if not logged in (desktop only)
          <Link to="/alpha_register" className="medi_head_link d-none d-md-block">
            Sign In
          </Link>
        )}
       
        {/* Mobile Menu Button */}
        <div className="medi_head_mobile_menu d-md-none">
          <button className="medi_head_menu_btn" onClick={toggleMenu}>☰</button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="medi_head_mobile_nav d-md-none text-center py-2">
          <Link 
            to="/about_page" 
            className="medi_head_link_about d-block py-1" 
            onClick={closeMenu}
          >
            About
          </Link>

          {username ? (
            <div className="mt-2">
              {/* Mobile Logout Icon */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
                alt="Logout"
                className="medi_head_logout_icon"
                onClick={handleLogout}
                style={{ cursor: "pointer", width: "32px", height: "32px" }}
              />
            </div>
          ) : (
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
