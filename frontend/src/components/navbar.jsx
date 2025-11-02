import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const userName = "Sanket";

  const linksBefore = [
    { name: "Home", path: "/" },
    { name: "Publications", path: "/publications" },
    { name: "Read More", path: "/read-more" },
    { name: "Create Profile", path: "/choice-section" },
  ];

  const linksAfter = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Find Experts", path: "/experts" },
    { name: "Clinical Trials", path: "/trials" },
    { name: "Forums", path: "/forums" },
    { name: "Favourites", path: "/favourites" },
    { name: "Publications", path: "/publications" },
  ];

  const displayedLinks = profileCreated ? linksAfter : linksBefore;

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div
            className="nav-logo"
            onClick={() => setProfileCreated(!profileCreated)}
          >
            Cura<span>Link</span>
          </div>

          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            {displayedLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>

          {profileCreated && (
            <div className="profile-logo">{userName[0]}</div>
          )}

          <div
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <style>{`
        /* 🌌 Navbar Base */
        .navbar {
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #302b63);
          padding: 15px 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
          border-bottom: 1px solid rgba(0, 255, 255, 0.3);
        }

        .nav-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* ✨ Logo */
        .nav-logo {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          letter-spacing: 1px;
        }

        .nav-logo span {
          background: linear-gradient(90deg, #00ffff, #8e2de2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 2s infinite alternate;
        }

        @keyframes glow {
          from { text-shadow: 0 0 10px cyan; }
          to { text-shadow: 0 0 20px violet; }
        }

        /* 🔗 Nav Links */
        .nav-links {
          list-style: none;
          display: flex;
          gap: 25px;
          transition: all 0.3s ease;
        }

        .nav-links li {
          position: relative;
        }

        .nav-links li a {
          text-decoration: none;

          color: #00ffff;
          font-weight: 500;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.3s ease;
        }

        /* 🩵 Underline Gradient Animation */
        .nav-links li a::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #00ffff, #8e2de2, #00ffff);
          transition: width 0.4s ease;
          border-radius: 2px;
        }

        .nav-links li a:hover {
          color: cyan;
        }

        .nav-links li a:hover::after {
          width: 100%;
        }

        /* 👤 Profile Circle */
        .profile-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ffff, #8e2de2);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          box-shadow: 0 0 10px rgba(0,255,255,0.6);
        }

        /* 🍔 Hamburger Menu */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background: #fff;
          transition: all 0.4s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* 📱 Responsive */
        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .nav-links {
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: rgba(10,10,30,0.95);
            text-align: center;
            padding: 20px 0;
            transform: translateY(-100%);
            opacity: 0;
          }
          .nav-links.open {
            transform: translateY(0);
            opacity: 1;
          }
          .nav-links li a::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
