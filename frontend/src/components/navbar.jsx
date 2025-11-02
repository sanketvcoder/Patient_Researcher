import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Simulating whether profile is created
    const [profileCreated, setProfileCreated] = useState(false);
    const userName = "Sanket"; // You can replace this dynamically later

    const linksBefore = ["Home", "Publications", "Read More", "Create Profile"];
    const linksAfter = [
        "Home",
        "Dashboard",
        "Find Experts",
        "Clinical Trial",
        "Publication Forums",
        "Favourites",
        "Publications",
    ];

    const displayedLinks = profileCreated ? linksAfter : linksBefore;

    return (
        <>
        <nav className="navbar">
            <div className="nav-container">
            {/* Logo */}
            <div className="nav-logo" onClick={() => setProfileCreated(!profileCreated)}>
                col<span>LAB</span>iora
            </div>

            {/* Navigation Links */}
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                {displayedLinks.map((link) => (
                <li key={link}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}>{link}</a>
                </li>
                ))}
            </ul>

            {/* Profile Logo (Only if profile created) */}
            {profileCreated && (
                <div className="profile-logo">
                {userName.charAt(0).toUpperCase()}
                </div>
            )}

            {/* Hamburger Icon */}
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

        {/* ✅ Inline Styles */}
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

            .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(90deg, #0f0c29, #302b63, #24243e);
            backdrop-filter: blur(12px);
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
            z-index: 1000;
            font-family: 'Poppins', sans-serif;
            }

            .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 60px;
            max-width: 1300px;
            margin: auto;
            }

            .nav-logo {
            font-size: 2rem;
            font-weight: 700;
            color: #00ffff;
            text-shadow: 0 0 10px #00ffff, 0 0 20px #8a2be2;
            cursor: pointer;
            transition: transform 0.3s ease, color 0.3s;
            letter-spacing: 1px;
            }

            .nav-logo span {
            color: #ffffff;
            }

            .nav-logo:hover {
            transform: scale(1.05);
            color: #b19cd9;
            }

            .nav-links {
            display: flex;
            list-style: none;
            gap: 40px;
            }

            .nav-links li a {
            color: white;
            font-size: 1.05rem;
            font-weight: 500;
            text-decoration: none;
            position: relative;
            transition: color 0.3s ease;
            }

            .nav-links li a::after {
            content: "";
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, cyan, violet);
            transition: width 0.4s ease;
            }

            .nav-links li a:hover {
            color: #00ffff;
            text-shadow: 0 0 5px #00ffff;
            }

            .nav-links li a:hover::after {
            width: 100%;
            }

            /* Profile logo (user initial) */
            .profile-logo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00ffff, #8a2be2);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.1rem;
            box-shadow: 0 0 15px rgba(0,255,255,0.6);
            cursor: pointer;
            transition: transform 0.3s ease;
            }

            .profile-logo:hover {
            transform: scale(1.1);
            box-shadow: 0 0 25px rgba(138,43,226,0.8);
            }

            /* Hamburger */
            .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            width: 25px;
            height: 20px;
            justify-content: space-between;
            }

            .hamburger span {
            background: white;
            height: 3px;
            width: 100%;
            border-radius: 5px;
            transition: all 0.3s ease;
            }

            .hamburger.open span:nth-child(1) {
            transform: rotate(45deg) translateY(8px);
            }

            .hamburger.open span:nth-child(2) {
            opacity: 0;
            }

            .hamburger.open span:nth-child(3) {
            transform: rotate(-45deg) translateY(-8px);
            }

            @media (max-width: 900px) {
            .nav-links {
                position: absolute;
                top: 70px;
                left: 0;
                background: rgba(15, 12, 41, 0.95);
                width: 100%;
                flex-direction: column;
                align-items: center;
                gap: 25px;
                padding: 25px 0;
                transform: translateY(-200%);
                transition: transform 0.4s ease;
            }

            .nav-links.open {
                transform: translateY(0%);
            }

            .hamburger {
                display: flex;
            }
            }

            .navbar::before {
            content: "";
            position: absolute;
            top: -20px;
            left: 0;
            width: 100%;
            height: 120%;
            background: radial-gradient(circle at top, rgba(0, 255, 255, 0.2), rgba(138, 43, 226, 0.2));
            filter: blur(20px);
            z-index: -1;
            }
        `}</style>
        </>
    );
};

export default Navbar;
