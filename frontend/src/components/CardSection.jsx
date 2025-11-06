import { useState } from "react";
import { FaUserMd, FaHeartbeat } from "react-icons/fa";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
=======
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214

const CardSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const Card = ({ title, desc, icon, id }) => (
<<<<<<< HEAD
    <motion.div
      className={`card ${selectedCard === id ? "selected" : ""}`}
      onClick={() => setSelectedCard(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200 }}
=======
    <div
      className={`card ${selectedCard === id ? "selected" : ""}`}
      onClick={() => setSelectedCard(id)}
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
<<<<<<< HEAD

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
=======
      <button className="continue-btn">Continue →</button>
    </div>
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
  );

  return (
    <section className="card-section">
<<<<<<< HEAD
      <motion.h1
        className="glow-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Select Your Role
      </motion.h1>
=======
      <h1 className="glow-title">Select Your Role</h1>
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214

      <div className="card-container">
        <Card
          title="Researcher"
          desc="Collaborate and share your medical research."
<<<<<<< HEAD
          icon={<FaUserMd size={30} />}
=======
          icon={<FaUserMd size={28} />}
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
          id="researcher"
        />
        <Card
          title="Patient / Caregiver"
          desc="Find trusted medical insights and connect with experts."
<<<<<<< HEAD
          icon={<FaHeartbeat size={30} />}
=======
          icon={<FaHeartbeat size={28} />}
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
          id="patient"
        />
      </div>

      <style>{`
        .card-section {
          min-height: 100vh;
<<<<<<< HEAD
          background: linear-gradient(135deg, #0f172a, #1e293b);
=======
          background: #0f0c29;
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
<<<<<<< HEAD
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
=======
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
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 45px;
          width: 100%;
          max-width: 900px;
<<<<<<< HEAD
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
=======
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
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
        }

        .icon {
          background: linear-gradient(135deg, #00f0ff, #8e2de2);
<<<<<<< HEAD
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
=======
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
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
          background: linear-gradient(90deg, #00f0ff, #8e2de2);
          border: none;
          color: white;
          padding: 10px 28px;
          border-radius: 25px;
          font-weight: 500;
<<<<<<< HEAD
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
=======
          box-shadow: 0 0 15px rgba(0,255,255,0.6);
          transition: all 0.4s ease;
        }

        .continue-btn:hover {
          box-shadow: 0 0 30px rgba(0,255,255,0.9);
          transform: scale(1.1);
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
        }
      `}</style>
    </section>
  );
};

export default CardSection;
