import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientSidebar from "../../components/Sidebar/PatientSidebar";
import { motion } from "framer-motion";

const Patient = () => {
    const [activeItem, setActiveItem] = useState("My Feeds");
    const [profile, setProfile] = useState(null);
    const [publications, setPublications] = useState([]);
    const [trials, setTrials] = useState([]);
    const [experts, setExperts] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState({});

    // ---- Fetch Data ----
    const fetchProfile = async () => {
        try {
        setLoading(true);
        const res = await axios.get("http://localhost:3002/api/dashboard/patients/profile", {
            withCredentials: true,
        });
        setProfile(res.data);
        } catch (err) {
        console.error("Error fetching profile:", err.message);
        } finally {
        setLoading(false);
        }
    };

    const fetchTrials = async () => {
        try {
        setLoading(true);
        const res = await axios.get("http://localhost:3002/api/dashboard/patients", {
            withCredentials: true,
        });
        setTrials(res.data.trials || []);
        } catch (err) {
        console.error("Error fetching clinical trials:", err.message);
        } finally {
        setLoading(false);
        }
    };

    const fetchPublications = async () => {
        try {
        setLoading(true);
        const res = await axios.get("http://localhost:3002/api/dashboard/patients/publications", {
            withCredentials: true,
        });
        setPublications(res.data.publications || []);
        } catch (err) {
        console.error("Error fetching publications:", err.message);
        } finally {
        setLoading(false);
        }
    };

    const fetchExperts = async () => {
        try {
        setLoading(true);
        const res = await axios.get(
            "http://localhost:3002/api/dashboard/patients/toKnowExpert",
            { withCredentials: true }
        );
        setExperts(res.data.experts?.slice(0, 10) || []); // max 10 experts
        } catch (err) {
        console.error("Error fetching experts:", err.message);
        } finally {
        setLoading(false);
        }
    };

    const toggleFavourite = (expert) => {
    setFavourites((prev) => {
        const exists = prev.some((e) => e.id === expert.id);
        if (exists) {
        // Remove from favourites
        return prev.filter((e) => e.id !== expert.id);
        } else {
        // Add to favourites
        return [...prev, expert];
        }
    });
    };



    useEffect(() => {
        if (activeItem === "Profile" || activeItem === "My Feeds") fetchProfile();
        if (activeItem === "Clinical Trials" || activeItem === "My Feeds") fetchTrials();
        if (activeItem === "My Feeds") fetchPublications();
        if (activeItem === "Experts") fetchExperts();
    }, [activeItem]);

    // ---- Utility ----
    const truncateText = (text = "", maxWords = 40) => {
        const words = text.split(" ");
        return words.length > maxWords ? words.slice(0, maxWords).join(" ") + " ..." : text;
    };

    const toggleExpand = (i) => {
        setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
    };

    // ---- Styles ----
    const containerStyle = {
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(145deg, #0d1117 0%, #161b22 100%)",
        color: "#fff",
    };

    const contentStyle = {
        flex: 1,
        padding: "40px",
        overflowY: "auto",
    };

    const sectionTitle = {
        fontSize: "1.8rem",
        color: "#00eaff",
        marginBottom: "20px",
        fontWeight: "600",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        gap: "24px",
    };

    const cardStyle = {
        background: "#1f2937",
        padding: "22px",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
    };

    const cardHover = {
        transform: "translateY(-6px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    };

    // ---- Render ----
    const renderContent = () => {
        if (loading) return <p>Loading...</p>;

        switch (activeItem) {
        case "Profile":
            return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={sectionTitle}>Profile Information</h2>
                {profile ? (
                <motion.div
                    style={cardStyle}
                    whileHover={cardHover}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Diseases:</strong> {profile.diseases?.join(", ")}</p>
                    <p><strong>Bio:</strong> {profile.basic_bio}</p>
                    <p><strong>Location:</strong> {profile.city}, {profile.state}, {profile.country}</p>
                </motion.div>
                ) : (
                <p>No profile data available</p>
                )}
            </motion.div>
            );

        case "Clinical Trials":
            return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={sectionTitle}>Active Clinical Trials</h2>
                <div style={gridStyle}>
                {trials.length ? (
                    trials.map((trial, i) => (
                    <motion.div
                        key={i}
                        style={cardStyle}
                        whileHover={cardHover}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <h3 style={{ fontSize: "1.2rem", color: "#00d4ff", marginBottom: "8px" }}>
                        {trial.protocolSection?.identificationModule?.briefTitle}
                        </h3>
                        <p><strong>Status:</strong> {trial.protocolSection?.statusModule?.overallStatus}</p>
                        <p><strong>Organization:</strong> {trial.protocolSection?.identificationModule?.organization?.fullName}</p>
                        <p style={{ marginTop: "8px", color: "#d1d5db" }}>
                        {truncateText(trial.protocolSection?.descriptionModule?.briefSummary, 45)}
                        </p>
                    </motion.div>
                    ))
                ) : (
                    <p>No trials found.</p>
                )}
                </div>
            </motion.div>
            );

        case "My Feeds":
            return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ ...sectionTitle, color: "#00d4ff" }}>
                Hello, {profile?.name || "Patient"} 👋
                </h2>

                {/* Publications */}
                <h3 style={{ ...sectionTitle, color: "#facc15", fontSize: "1.4rem" }}>
                Publications Related to Your Diseases
                </h3>
                <div style={gridStyle}>
                {publications.length ? (
                    publications.map((pub, i) => (
                    <motion.div
                        key={i}
                        style={cardStyle}
                        whileHover={cardHover}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#38bdf8" }}>
                        {pub.title}
                        </h4>
                        <p style={{ color: "#9ca3af", marginBottom: "8px" }}>
                        {pub.authors} ({pub.year}) - <em>{pub.publication}</em>
                        </p>
                        <p style={{ lineHeight: "1.6", color: "#d1d5db" }}>
                        {expanded[i]
                            ? pub.searchMatch?.replace(/\n/g, " ")
                            : truncateText(pub.searchMatch, 40)}
                        </p>

                        {pub.searchMatch?.split(" ").length > 40 && (
                        <button
                            onClick={() => toggleExpand(i)}
                            style={{
                            marginTop: "8px",
                            background: "none",
                            border: "none",
                            color: "#00d4ff",
                            cursor: "pointer",
                            fontWeight: "600",
                            }}
                        >
                            {expanded[i] ? "Show Less ▲" : "Read More ▼"}
                        </button>
                        )}
                        {pub.link && (
                        <a
                            href={pub.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                            display: "block",
                            marginTop: "10px",
                            color: "#22c55e",
                            textDecoration: "none",
                            fontWeight: "500",
                            }}
                        >
                            🔗 View Publication
                        </a>
                        )}
                    </motion.div>
                    ))
                ) : (
                    <p>No publications found.</p>
                )}
                </div>

                {/* Trials */}
                <h3
                style={{
                    ...sectionTitle,
                    color: "#22c55e",
                    fontSize: "1.4rem",
                    marginTop: "40px",
                }}
                >
                Top Clinical Trials
                </h3>
                <div style={gridStyle}>
                {trials.length ? (
                    trials.slice(0, 6).map((trial, i) => (
                    <motion.div
                        key={i}
                        style={cardStyle}
                        whileHover={cardHover}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#00eaff" }}>
                        {trial.protocolSection?.identificationModule?.briefTitle}
                        </h4>
                        <p style={{ color: "#d1d5db" }}>
                        {truncateText(trial.protocolSection?.descriptionModule?.briefSummary, 35)}
                        </p>
                    </motion.div>
                    ))
                ) : (
                    <p>No clinical trials found.</p>
                )}
                </div>
            </motion.div>
            );

        case "Experts":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ fontSize: "1.8rem", color: "#ff9800", marginBottom: "20px" }}>
        Experts Related to Your Disease
      </h2>
      {loading && <p>Loading experts...</p>}
      {!loading && experts.length === 0 && <p>No experts found.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {experts.map((expert) => (
          <motion.div
            key={expert.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#1f2937",
              padding: "16px",
              borderRadius: "8px",
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <p><strong>Name:</strong> {expert.name}</p>
              <p><strong>Email:</strong> {expert.email}</p>
              <p><strong>Phone:</strong> {expert.phone}</p>
              <p><strong>Field:</strong> {expert.field}</p>
              <p style={{ fontStyle: "italic", color: "#9ca3af" }}>{expert.brief}</p>
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: favourites.some((e) => e.id === expert.id) ? "#ffd700" : "#ffffff",
              }}
              onClick={() => toggleFavourite(expert)}
            >
              ★
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

// ---- Favourites Section ----
case "Favourites":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ fontSize: "1.8rem", color: "#ff4081", marginBottom: "20px" }}>
        Your Favourite Experts
      </h2>
      {favourites.length === 0 && <p>No favourites added yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {favourites.map((expert) => (
          <motion.div
            key={expert.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#1f2937",
              padding: "16px",
              borderRadius: "8px",
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <p><strong>Name:</strong> {expert.name}</p>
              <p><strong>Email:</strong> {expert.email}</p>
              <p><strong>Phone:</strong> {expert.phone}</p>
              <p><strong>Field:</strong> {expert.field}</p>
              <p style={{ fontStyle: "italic", color: "#9ca3af" }}>{expert.brief}</p>
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#ffd700",
              }}
              onClick={() => toggleFavourite(expert)}
            >
              ★
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

        default:
            return <p>Select a menu option.</p>;
        }
    };

    return (
        <div style={containerStyle}>
        <PatientSidebar active={activeItem} setActive={setActiveItem} />
        <motion.div
            style={contentStyle}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            {renderContent()}
        </motion.div>
        </div>
    );
};

export default Patient;
