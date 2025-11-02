import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileCreated, setProfileCreated] = useState(false);
    const userName = "Sanket";

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

    const handleScroll = (e, link) => {
        e.preventDefault();
        if (link === "Create Profile") {
        const section = document.getElementById("cardSection");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });

            // Trigger temporary glowing border animation
            section.classList.add("section-glow");
            setTimeout(() => section.classList.remove("section-glow"), 3000);
        }
        }
    };

    return (
        <>
        <nav className="navbar">
            <div className="nav-container">
            {/* Logo */}
            <div
                className="nav-logo"
                onClick={() => setProfileCreated(!profileCreated)}
            >
                Cura<span>Link</span>
            </div>

            {/* Navigation Links */}
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                {displayedLinks.map((link) => (
                <li key={link}>
                    <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={(e) => handleScroll(e, link)}
                    >
                    {link}
                    </a>
                </li>
                ))}
            </ul>

            {/* Profile Icon */}
            {profileCreated && (
                <div className="profile-logo">{userName.charAt(0)}</div>
            )}

            {/* Hamburger */}
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

        {/* ✅ Styles */}
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
            * { scroll-behavior: smooth; }

            .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(90deg, #0f0c29, #302b63, #24243e);
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            z-index: 1000;
            font-family: 'Poppins', sans-serif;
            }

            .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 60px;
            }

            .nav-logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: #00ffff;
            text-shadow: 0 0 15px #00ffff, 0 0 25px #8a2be2;
            cursor: pointer;
            }

            .nav-logo span {
            color: #fff;
            }

            .nav-links {
            display: flex;
            list-style: none;
            gap: 35px;
            }

            .nav-links li a {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
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
            text-shadow: 0 0 8px #00ffff;
            }

            .nav-links li a:hover::after {
            width: 100%;
            }

            .profile-logo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00ffff, #8a2be2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            box-shadow: 0 0 20px rgba(0,255,255,0.6);
            }

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

            @media (max-width: 900px) {
            .nav-links {
                position: absolute;
                top: 70px;
                left: 0;
                background: rgba(15, 12, 41, 0.95);
                width: 100%;
                flex-direction: column;
                align-items: center;
                gap: 20px;
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
        `}</style>
        </>
    );
};

export default Navbar;
