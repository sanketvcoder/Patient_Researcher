import React, { useState, useEffect } from "react";
import axios from "axios";
import ResearcherSidebar from "../../components/Sidebar/ResearcherSidebar";
import { motion } from "framer-motion";

const Researcher = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [profile, setProfile] = useState(null);
  const [publications, setPublications] = useState([]);
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3002/api/dashboard/researchers/profile", {
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
      const res = await axios.get("http://localhost:3002/api/dashboard/researchers", {
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
      const res = await axios.get("http://localhost:3002/api/dashboard/researchers/publications", {
        withCredentials: true,
      });
      setPublications(res.data.publications || []);
    } catch (err) {
      console.error("Error fetching publications:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (["Dashboard", "My Trials"].includes(activeItem)) fetchTrials();
    if (["Dashboard", "Publications"].includes(activeItem)) fetchPublications();
    if (["Profile", "Dashboard"].includes(activeItem)) fetchProfile();
  }, [activeItem]);

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;

    switch (activeItem) {
      case "Profile":
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl text-cyan-400 mb-4">Profile Information</h2>
            {profile ? (
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Interests:</strong> {profile.interest?.join(", ")}</p>
                <p><strong>Bio:</strong> {profile.basic_bio}</p>
              </div>
            ) : (
              <p>No profile data available</p>
            )}
          </motion.div>
        );

      case "My Trials":
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl text-cyan-400 mb-4">My Clinical Trials</h2>
            {trials.length ? (
              trials.map((trial, i) => (
                <div key={i} className="bg-gray-800 mb-3 p-3 rounded-md shadow-md">
                  <p><strong>{trial.protocolSection?.identificationModule?.briefTitle}</strong></p>
                  <p>{trial.protocolSection?.statusModule?.overallStatus}</p>
                </div>
              ))
            ) : (
              <p>No trials found.</p>
            )}
          </motion.div>
        );

      case "Publications":
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl text-cyan-400 mb-4">Your Related Publications</h2>
            {publications.length ? (
              publications.map((pub, i) => (
                <div key={i} className="bg-gray-800 mb-3 p-3 rounded-md shadow-md">
                  <p><strong>{pub.title}</strong></p>
                  <p>{pub.abstract?.slice(0, 100)}...</p>
                </div>
              ))
            ) : (
              <p>No publications found.</p>
            )}
          </motion.div>
        );

      default:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl text-cyan-400 mb-4">Welcome, {profile?.name || "Researcher"} 👋</h2>
            <p>Track your trials, publications, and collaborators here.</p>
          </motion.div>
        );
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ResearcherSidebar active={activeItem} setActive={setActiveItem} />
      <div style={{ flex: 1, padding: "40px", color: "#fff", backgroundColor: "#0d1117" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Researcher;
