import { useState } from "react";
import { FaUserMd, FaHeartbeat } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CardSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const Card = ({ title, desc, icon, id }) => (
    <motion.div
      className={`card ${selectedCard === id ? "selected" : ""}`}
      onClick={() => setSelectedCard(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>

      {selectedCard === id && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={`/profile-creation?role=${id}`} className="continue-btn">
            Continue →
          </Link>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <section className="card-section">
      <motion.h1
        className="glow-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Select Your Role
      </motion.h1>

      <div className="card-container">
        <Card
          title="Researcher"
          desc="Collaborate and share your medical research."
          icon={<FaUserMd size={30} />}
          id="researcher"
        />
        <Card
          title="Patient / Caregiver"
          desc="Find trusted medical insights and connect with experts."
          icon={<FaHeartbeat size={30} />}
          id="patient"
        />
      </div>

      <style>{`
        .card-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          color: white;
          text-align: center;
        }

        .glow-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 60px;
          background: linear-gradient(90deg, #00f0ff, #8e2de2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(0,255,255,0.4);
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 45px;
          width: 100%;
          max-width: 900px;
          justify-items: center;
        }

        .card {
          background: rgba(255,255,255,0.08);
          border: 2px solid transparent;
          border-radius: 18px;
          padding: 35px 25px;
          cursor: pointer;
          transition: all 0.4s ease;
          max-width: 320px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .card.selected {
          border-color: #00ffff;
          box-shadow: 0 0 25px rgba(0,255,255,0.4);
          background: rgba(255,255,255,0.12);
        }

        .icon {
          background: linear-gradient(135deg, #00f0ff, #8e2de2);
          width: 70px;
          height: 70px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: white;
          box-shadow: 0 0 15px rgba(0,255,255,0.4);
        }

        h3 {
          margin: 10px 0 8px;
          font-size: 1.3rem;
          font-weight: 600;
        }

        p {
          font-size: 0.95rem;
          color: #cbd5e1;
          line-height: 1.4;
        }

        .continue-btn {
          margin-top: 18px;
          background: linear-gradient(90deg, #00f0ff, #8e2de2);
          border: none;
          color: white;
          padding: 10px 28px;
          border-radius: 25px;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 0 15px rgba(0,255,255,0.6);
          transition: all 0.3s ease;
        }

        .continue-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 0 25px rgba(0,255,255,0.9);
        }

        @media (max-width: 768px) {
          .glow-title {
            font-size: 2rem;
          }
          .card {
            padding: 25px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default CardSection;
