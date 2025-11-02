import React, { useState } from "react";
import { FaUserMd, FaHeartbeat } from "react-icons/fa";

const Card = ({ title, description, icon, isSelected, onSelect }) => (
    <div className={`card ${isSelected ? "selected" : ""}`} onClick={onSelect}>
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="continue-btn">
        Continue <span>→</span>
        </button>
    </div>
    );

    const CardSection = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <>
        <section id="cardSection" className="card-section">
            <h1 className="glow-title">Select Your Role</h1>

            <div className="card-container">
            <Card
                title="Researcher"
                description="Collaborate and share your medical research."
                icon={<FaUserMd size={28} />}
                isSelected={selectedCard === "researcher"}
                onSelect={() => setSelectedCard("researcher")}
            />
            <Card
                title="Patient / Caregiver"
                description="Find medical information and connect with experts."
                icon={<FaHeartbeat size={28} />}
                isSelected={selectedCard === "patient"}
                onSelect={() => setSelectedCard("patient")}
            />
            </div>
        </section>

        <style>{`
            /* 🌌 Section Styling */
            .card-section {
            min-height: 100vh;
            padding: 100px 20px;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.5s ease;
            }

            /* ✨ Glowing Title */
            .glow-title {
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(90deg, #00ffff, #8e2de2, #00ffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: textGlow 2.5s ease-in-out infinite alternate;
            letter-spacing: 1px;
            margin-bottom: 60px;
            }

            @keyframes textGlow {
            0% { text-shadow: 0 0 8px #00ffff, 0 0 12px #8e2de2; }
            100% { text-shadow: 0 0 18px #8e2de2, 0 0 28px #00ffff; }
            }

            /* 🧩 Card Grid */
            .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 50px;
            width: 100%;
            max-width: 950px;
            }

            /* 🪩 Card Style */
            .card {
            background: rgba(255,255,255,0.05);
            border: 2px solid transparent;
            border-radius: 20px;
            padding: 40px 25px;
            cursor: pointer;
            color: #fff;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            }

            .card::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 20px;
            background: linear-gradient(120deg, rgba(0,255,255,0.3), rgba(138,43,226,0.3));
            opacity: 0;
            transition: opacity 0.4s ease;
            }

            .card:hover::before,
            .card.selected::before {
            opacity: 1;
            }

            .card:hover,
            .card.selected {
            border-color: #00ffff;
            box-shadow: 0 0 20px rgba(0,255,255,0.4), 0 0 40px rgba(138,43,226,0.2);
            transform: translateY(-5px) scale(1.03);
            }

            /* 💠 Icon */
            .icon {
            background: linear-gradient(135deg, #00f0ff, #8e2de2);
            width: 65px;
            height: 65px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 0 20px rgba(0,255,255,0.4);
            transition: transform 0.3s ease;
            }

            .card:hover .icon {
            transform: rotate(10deg) scale(1.1);
            }

            /* 🔤 Card Text */
            .card h3 {
            font-size: 1.4rem;
            font-weight: 600;
            margin: 15px 0 10px;
            }

            .card p {
            font-size: 1rem;
            color: #ccc;
            line-height: 1.5;
            margin-bottom: 20px;
            }

            /* 🎯 Continue Button */
            .continue-btn {
            background: linear-gradient(90deg, #00f0ff, #8e2de2);
            border: none;
            color: white;
            padding: 10px 28px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            box-shadow: 0 0 12px rgba(0,255,255,0.6);
            transition: all 0.4s ease;
            }

            .continue-btn:hover {
            box-shadow: 0 0 25px rgba(0,255,255,0.9);
            transform: scale(1.1);
            }

            /* 📱 Responsive */
            @media (max-width: 768px) {
            .glow-title {
                font-size: 2.2rem;
                margin-bottom: 40px;
            }
            .card-container {
                gap: 30px;
            }
            .card {
                padding: 30px 20px;
            }
            }
        `}</style>
        </>
    );
};

export default CardSection;
