import { useState } from "react";
import { FaUserMd, FaHeartbeat } from "react-icons/fa";

const CardSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const Card = ({ title, desc, icon, id }) => (
    <div
      className={`card ${selectedCard === id ? "selected" : ""}`}
      onClick={() => setSelectedCard(id)}
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button className="continue-btn">Continue →</button>
    </div>
  );

  return (
    <section className="card-section">
      <h1 className="glow-title">Select Your Role</h1>

      <div className="card-container">
        <Card
          title="Researcher"
          desc="Collaborate and share your medical research."
          icon={<FaUserMd size={28} />}
          id="researcher"
        />
        <Card
          title="Patient / Caregiver"
          desc="Find trusted medical insights and connect with experts."
          icon={<FaHeartbeat size={28} />}
          id="patient"
        />
      </div>

      <style>{`
        .card-section {
          min-height: 100vh;
          background: #0f0c29;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          animation: fadeUp 1s ease-out;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .glow-title {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 60px;
          background: linear-gradient(90deg, #8e2de2, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pulse 2s infinite alternate;
        }

        @keyframes pulse {
          0% { text-shadow: 0 0 15px cyan; }
          100% { text-shadow: 0 0 30px violet; }
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 45px;
          width: 100%;
          max-width: 900px;
        }

        .card {
          background: rgba(255,255,255,0.05);
          border: 2px solid transparent;
          border-radius: 20px;
          padding: 35px 25px;
          cursor: pointer;
          transition: all 0.4s ease;
          text-align: center;
          color: #fff;
        }

        .card:hover, .card.selected {
          border-color: #00ffff;
          box-shadow: 0 0 30px rgba(0,255,255,0.5);
          transform: scale(1.05);
        }

        .icon {
          background: linear-gradient(135deg, #00f0ff, #8e2de2);
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .continue-btn {
          margin-top: 20px;
          background: linear-gradient(90deg, #00f0ff, #8e2de2);
          border: none;
          color: white;
          padding: 10px 28px;
          border-radius: 25px;
          font-weight: 500;
          box-shadow: 0 0 15px rgba(0,255,255,0.6);
          transition: all 0.4s ease;
        }

        .continue-btn:hover {
          box-shadow: 0 0 30px rgba(0,255,255,0.9);
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default CardSection;
