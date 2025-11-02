import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Rocket,
    Code,
    Trophy,
    BookOpen,
    HeartHandshake,
    ArrowUp,
    } from "lucide-react";
    const tabs = [
    { id: "overview", icon: <Rocket size={18} />, label: "Overview" },
    { id: "patient", icon: <Users size={18} />, label: "Patient Flow" },
    { id: "researcher", icon: <BookOpen size={18} />, label: "Researcher Flow" },
    { id: "tech", icon: <Code size={18} />, label: "Tech Stack" },
    { id: "submission", icon: <Trophy size={18} />, label: "Submission & Prizes" },
    { id: "experience", icon: <HeartHandshake size={18} />, label: "My Experience" },
    ];

    const HackathonReadMore = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [expanded, setExpanded] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowScroll(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const renderContent = () => {
        switch (activeTab) {
        case "overview":
            return (
            <>
                <h2>🚀 Project Overview</h2>
                <p>
                <b>CuraLink</b> is an AI-powered platform connecting <b>patients</b> and <b>researchers</b> through discovery of clinical trials, experts, and publications.
                </p>
                <ul>
                <li>Minimal landing page</li>
                <li>Onboarding for both roles</li>
                <li>Personalized dashboards</li>
                <li>Favorites & forum sections</li>
                </ul>
            </>
            );

        case "patient":
            return (
            <>
                <h2>👩‍⚕️ Patient Flow</h2>
                <ol>
                <li>Profile setup with natural language input</li>
                <li>Personalized dashboard recommendations</li>
                <li>Search & follow experts</li>
                <li>Explore clinical trials with filters & AI summaries</li>
                <li>Engage in forums & save favorites</li>
                </ol>
            </>
            );

        case "researcher":
            return (
            <>
                <h2>🧑‍🔬 Researcher Flow</h2>
                <ul>
                <li>Profile setup with specialties & auto-import</li>
                <li>Collaborator search and connection</li>
                <li>Forum interactions & managing trials</li>
                <li>Save favorite studies & researchers</li>
                </ul>
            </>
            );

        case "tech":
            return (
            <>
                <h2>🧰 Tech Stack</h2>
                <ul>
                <li><b>Frontend:</b> React.js (responsive + animations)</li>
                <li><b>Backend:</b> Node.js / FastAPI</li>
                <li><b>Database:</b> PostgreSQL</li>
                <li><b>APIs:</b> PubMed, ORCID, ResearchGate, Google Scholar</li>
                <li><b>Design:</b> AI-assisted, clean, accessible UI</li>
                </ul>
            </>
            );

        case "submission":
            return (
            <>
                <h2>🏆 Submission & Prizes</h2>
                <ul>
                <li>Submit Demo Video (3–5 mins) & Deployment Link</li>
                <li>Join official submission Telegram group</li>
                <li><b>Winner:</b> Full-time offer as founding member</li>
                <li><b>Certificates:</b> for all valid MVP submissions</li>
                </ul>
            </>
            );

        case "experience":
            return (
            <>
                <h2>💡 My Experience</h2>
                <p className="quote">
                “Building CuraLink for this hackathon was one of the most inspiring experiences — it blended creativity, AI innovation, and real-world healthcare impact.”
                </p>
                <p className="author">— Built by Sanket Kumar Verma</p>
            </>
            );

        default:
            return null;
        }
    };

    return (
        <div className="hackathon-container">
        <motion.h1
            className="main-heading"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            CuraLink Hackathon — Where Innovation Meets Impact
        </motion.h1>

        {/* Tabs */}
        <div className="tab-container">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            >
                {tab.icon}
                <span>{tab.label}</span>
            </button>
            ))}
        </div>

        {/* Content */}
        <div className="content-box">
            <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4 }}
            >
                {expanded ? renderContent() : (
                <div className="collapsed">{renderContent()}</div>
                )}
            </motion.div>
            </AnimatePresence>

            <button className="read-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Collapse ▲" : "Read More ▼"}
            </button>
        </div>

        {/* Timeline */}
        <div className="timeline">
            {["Landing Page", "Patient Flow", "Researcher Flow", "Dashboard", "Submission"].map((step, i) => (
            <motion.div
                key={i}
                className={`timeline-step ${i % 2 === 0 ? "left" : "right"}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="timeline-content">{step}</div>
            </motion.div>
            ))}
        </div>

        {/* Scroll Top */}
        {showScroll && (
            <button className="scroll-top" onClick={scrollToTop}>
            <ArrowUp size={20} />
            </button>
        )}

        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            🚀 CuraLink – Empowering Research. Connecting Hope.
        </motion.footer>

        {/* Manual CSS */}
        <style>{`
            .hackathon-container {
            margin:70px 0 0 0;
            min-height: 100vh;
            background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #302b63);
            background-size: 400% 400%;
            animation: gradientShift 10s ease infinite;
            color: #f0f0f0;
            padding: 60px 20px;
            font-family: 'Poppins', sans-serif;
            text-align: center;
            }

            @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
            }

            .main-heading {
            font-size: 2.7rem;
            font-weight: 700;
            color: #00eaff;
            text-shadow: 0 0 20px rgba(0, 234, 255, 0.5);
            margin-bottom: 30px;
            }

            .tab-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            margin: 30px 0;
            }

            .tab-btn {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(0, 234, 255, 0.4);
            color: #00eaff;
            padding: 10px 20px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: 0.3s ease;
            font-weight: 500;
            }

            .tab-btn.active {
            background: linear-gradient(90deg, #00eaff, #8a2be2);
            color: white;
            box-shadow: 0 0 15px rgba(0,234,255,0.6);
            }

            .tab-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 10px rgba(0,234,255,0.3);
            }

            .content-box {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(0,234,255,0.2);
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 0 20px rgba(0,234,255,0.1);
            text-align: left;
            color: #dcdcdc;
            }

            h2 {
            color: #00eaff;
            margin-bottom: 10px;
            text-shadow: 0 0 10px rgba(0,234,255,0.5);
            }

            p, li {
            color: #cfcfcf;
            line-height: 1.6;
            }

            .collapsed {
            max-height: 150px;
            overflow: hidden;
            }

            .read-btn {
            display: block;
            margin: 20px auto 0;
            background: none;
            color: #00eaff;
            border: none;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s;
            }

            .read-btn:hover {
            color: #8a2be2;
            text-shadow: 0 0 10px rgba(138,43,226,0.5);
            }

            .timeline {
            max-width: 600px;
            margin: 60px auto;
            position: relative;
            }

            .timeline::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 3px;
            background: rgba(0, 234, 255, 0.4);
            transform: translateX(-50%);
            }

            .timeline-step {
            display: flex;
            margin-bottom: 30px;
            }

            .timeline-step.left {
            justify-content: flex-start;
            }

            .timeline-step.right {
            justify-content: flex-end;
            }

            .timeline-content {
            background: linear-gradient(90deg, #00eaff, #8a2be2);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            box-shadow: 0 0 20px rgba(0,234,255,0.4);
            font-weight: 500;
            }

            .scroll-top {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background: linear-gradient(90deg, #00eaff, #8a2be2);
            color: white;
            border: none;
            border-radius: 50%;
            padding: 12px;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(0,234,255,0.5);
            transition: 0.3s;
            }

            .scroll-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 25px rgba(0,234,255,0.8);
            }

            .footer {
            margin-top: 60px;
            font-weight: 600;
            color: #00eaff;
            text-shadow: 0 0 15px rgba(0,234,255,0.4);
            }

            .quote {
            font-style: italic;
            color: #ccc;
            }

            .author {
            margin-top: 10px;
            color: #8a2be2;
            font-weight: bold;
            }

            @media (max-width: 600px) {
            .main-heading { font-size: 2rem; }
            .tab-btn { font-size: 0.9rem; padding: 8px 14px; }
            }
        `}</style>
        </div>
    );
};

export default HackathonReadMore;
