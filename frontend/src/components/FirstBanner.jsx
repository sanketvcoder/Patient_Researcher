import { Link } from "react-router-dom";

const FirstBanner = () => {
  return (
    <section className="banner">
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h1>
          Welcome to <span>CuraLink</span>
        </h1>
        <p>
          Bridging patients, caregivers, and researchers through trusted medical
          insights and collaboration.
        </p>

        <Link to="/choice-section" className="explore-btn">
          <span>Explore Now</span>
        </Link>
      </div>

      <style>{`
        /* 🌌 Banner Background Animation */
        .banner {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #302b63);
          background-size: 400% 400%;
          animation: gradientShift 10s ease infinite;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          overflow: hidden;
          padding: 20px;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ✨ Floating Light Orbs */
        .banner::before,
        .banner::after {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,255,0.15), transparent);
          animation: floatOrb 8s ease-in-out infinite alternate;
          z-index: 1;
        }

        .banner::before { top: 10%; left: 15%; animation-delay: 0s; }
        .banner::after { bottom: 10%; right: 15%; animation-delay: 3s; }

        @keyframes floatOrb {
          0% { transform: translateY(0px) scale(1); opacity: 0.4; }
          100% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
        }

        /* 🌈 Title */
        .banner-content h1 {
          font-size: 3.3rem;
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(90deg, #00ffff, #8e2de2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          z-index: 2;
        }

        .banner-content span {
          background: linear-gradient(90deg, #8e2de2, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* 🩵 Paragraph */
        .banner-content p {
          max-width: 600px;
          margin: 0 auto 40px;
          color: #e0e0e0;
          line-height: 1.7;
          font-size: 1.1rem;
          z-index: 2;
        }

        /* 🌊 Clean, Glowing Button with Gradient Text */
        .explore-btn {
          position: relative;
          display: inline-block;
          padding: 14px 42px;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-decoration: none;
          border-radius: 40px;
          background: linear-gradient(90deg, #00ffff, #8e2de2);
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 0 12px rgba(0,255,255,0.4);
          z-index: 3;
        }

        .explore-btn:hover {
          transform: scale(1.07);
          box-shadow: 0 0 25px rgba(0,255,255,0.7);
        }

        /* 🎨 Gradient Text inside Button */
        .explore-btn span {
          position: relative;
          z-index: 2;
          font-weight: 700;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffffff, #b3f5ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* 📱 Responsive */
        @media (max-width: 768px) {
          .banner-content h1 { font-size: 2.4rem; }
          .explore-btn { padding: 12px 30px; font-size: 1rem; }
        }
      `}</style>
    </section>
  );
};

export default FirstBanner;
