import React from "react";
import { motion } from "framer-motion";
import "./Sidebar.css";

const PatientSidebar = ({ active, setActive }) => {
  const menuItems = [
    "My Feeds",
    "Clinical Trials",
    "Experts",
    "Favourites",
    "Chat",
    "Profile",
    "Logout",
  ];

  return (
    <motion.div
        className="sidebar"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        >
        <h2>CuraLink</h2>
        <ul>
            {menuItems.map((item) => (
            <motion.li
                key={item}
                className={active === item ? "active" : ""}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActive(item)}
            >
                {item}
            </motion.li>
            ))}
        </ul>
        <div className="sidebar-footer">© 2025 Patient Portal</div>
    </motion.div>

  );
};

export default PatientSidebar;
