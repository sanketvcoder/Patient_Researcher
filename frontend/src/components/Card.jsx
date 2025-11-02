import React from "react";
import "./Card.css";

const Card = ({ icon, title, description, selected, onClick }) => {
    return (
        <div
        className={`role-card ${selected ? "selected" : ""}`}
        onClick={onClick}
        >
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    .role-card {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    color: white;
    font-family: 'Poppins', sans-serif;
    width: 300px;
    transition: all 0.4s ease;
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.2);
    backdrop-filter: blur(10px);
    cursor: pointer;
    }

    .role-card .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #00ffff;
    transition: color 0.4s ease;
    }

    .role-card h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    }

    .role-card p {
    font-size: 0.95rem;
    color: #cfcfcf;
    line-height: 1.5;
    }

    /* Hover + Glow */
    .role-card:hover {
    transform: translateY(-10px);
    border-color: #8a2be2;
    background: linear-gradient(145deg, rgba(138, 43, 226, 0.15), rgba(0, 255, 255, 0.1));
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.3),
                0 0 45px rgba(138, 43, 226, 0.3);
    }

    /* Selected state */
    .role-card.selected {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
    }

    @media (max-width: 768px) {
    .role-card {
        width: 100%;
        max-width: 90%;
        margin: 1rem auto;
    }
    }

        `
            }</style>
        </div>
    );
};

export default Card;
