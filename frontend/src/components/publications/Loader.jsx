    const Loader = () => {
    return (
        <div className="loader-container">
        {Array.from({ length: 5 }).map((_, i) => (
            <div className="shimmer-card" key={i}></div>
        ))}

        <style>{`
            .loader-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
            }

            .shimmer-card {
            height: 150px;
            border-radius: 10px;
            background: linear-gradient(
                90deg,
                #2c2c50 25%,
                #3a3a6b 50%,
                #2c2c50 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            }

            @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
            }
        `}</style>
        </div>
    );
    };

    export default Loader;
