import React, { useEffect } from "react";

const FirstBanner = () => {
    useEffect(() => {
        const elements = document.querySelectorAll(".fade-up");
        elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("visible");
        }, index * 300);
        });
    }, []);

    return (
        <>
        <section className="banner">
            <div className="banner-content">
            <h1 className="fade-up">
                Welcome to <span>CuraLink</span> — Connecting Patients and Researchers
            </h1>
            <p className="fade-up">
                Discover relevant clinical trials, research publications, and trusted
                health experts — all in one place.
            </p>
            <button className="fade-up explore-btn">Explore Now</button>
            </div>

            {/* Wavy Bottom Border */}
            <div className="wave-border">
            <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                className="wave-path"
                d="M321.39,56.09C161.29,69.27,0,120,0,120V0H1200V120S1032.36,84.71,871.29,74.57C710.22,64.43,481.5,42.91,321.39,56.09Z"
                fill="url(#waveGradient)"
                />
                <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0f0c29">
                    <animate
                        attributeName="stop-color"
                        values="#0f0c29;#302b63;#24243e;#0f0c29"
                        dur="6s"
                        repeatCount="indefinite"
                    />
                    </stop>
                    <stop offset="100%" stopColor="#302b63">
                    <animate
                        attributeName="stop-color"
                        values="#302b63;#24243e;#0f0c29;#302b63"
                        dur="6s"
                        repeatCount="indefinite"
                    />
                    </stop>
                </linearGradient>
                </defs>
            </svg>
            </div>
        </section>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

            body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
            overflow-x: hidden;
            }

            .banner {
            width: 100%;
            height: 100vh; /* full screen height */
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            color: white;
            padding: 60px 20px;
            position: relative;
            overflow: hidden;
            animation: bannerFadeIn 1.2s ease-in-out;
            }

            .banner::before {
            content: "";
            position: absolute;
            top: -50px;
            left: -50px;
            width: 150%;
            height: 150%;
            background: radial-gradient(circle at 30% 20%, rgba(0, 255, 255, 0.1), transparent 60%),
                        radial-gradient(circle at 70% 80%, rgba(138, 43, 226, 0.12), transparent 70%);
            filter: blur(15px);
            z-index: 0;
            }

            .banner-content {
            position: relative;
            z-index: 2;
            max-width: 850px;
            animation: slideUp 1.4s ease-out;
            padding: 0 1.2rem;
            }

            .banner h1 {
            font-size: clamp(2rem, 5vw, 3.2rem);
            line-height: 1.3;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(0,255,255,0.4);
            margin-bottom: 20px;
            letter-spacing: 0.6px;
            }

            .banner h1 span {
            background: linear-gradient(90deg, #00ffff, #8a2be2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 18px rgba(0,255,255,0.6);
            }

            .banner p {
            font-size: clamp(1rem, 2.5vw, 1.25rem);
            color: #cfcfcf;
            max-width: 700px;
            margin: 0 auto 40px auto;
            line-height: 1.6;
            padding: 0 10px;
            }

            .explore-btn {
            background: linear-gradient(90deg, #00ffff, #8a2be2);
            border: none;
            padding: 14px 48px;
            font-size: clamp(0.95rem, 2vw, 1.1rem);
            color: white;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 0 18px rgba(0,255,255,0.3);
            }

            .explore-btn:hover {
            background: linear-gradient(270deg, #8a2be2, #00ffff);
            box-shadow: 0 0 30px rgba(138,43,226,0.7), 0 0 50px rgba(0,255,255,0.6);
            transform: scale(1.08);
            }

            /* Wave border */
            .wave-border {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            line-height: 0;
            overflow: hidden;
            animation: waveFloat 6s ease-in-out infinite alternate;
            }

            .wave-border svg {
            display: block;
            width: 100%;
            height: 120px;
            transform: rotate(180deg);
            animation: waveMove 10s linear infinite;
            }

            .wave-path {
            filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))
                    drop-shadow(0 0 20px rgba(138, 43, 226, 0.2));
            }

            @keyframes waveMove {
            0% { transform: translateX(0) rotate(180deg); }
            50% { transform: translateX(-25px) rotate(180deg); }
            100% { transform: translateX(0) rotate(180deg); }
            }

            @keyframes waveFloat {
            0% { transform: translateY(0); }
            50% { transform: translateY(8px); }
            100% { transform: translateY(0); }
            }

            .fade-up {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
            }

            .fade-up.visible {
            opacity: 1;
            transform: translateY(0);
            }

            @keyframes bannerFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
            }

            @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
            }

            /* Responsive Adjustments */
            @media (max-width: 480px) {
            .banner {
                height: 100vh;
                padding: 30px 10px;
            }

            .banner h1 {
                font-size: 1.8rem;
            }

            .banner p {
                font-size: 1rem;
            }

            .explore-btn {
                padding: 10px 28px;
            }

            .wave-border svg {
                height: 90px;
            }
            }
        `}</style>
        </>
    );
};

export default FirstBanner;
