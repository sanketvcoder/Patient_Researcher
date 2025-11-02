import { useState, useRef } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const debounceRef = useRef(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Debounce API call (500ms)
        debounceRef.current = setTimeout(() => {
        onSearch(value);
        }, 500);
    };

    return (
        <div className="search-wrapper">
        <div className="search-bar">
            <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search publications..."
            className="search-input"
            />

            <button onClick={() => onSearch(query)} className="search-btn" title="Search">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="search-icon"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
            </svg>
            </button>
        </div>

        <style>{`
            /* --- Main Wrapper --- */
            .search-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 60px 0 40px;
            }

            /* --- Search Bar Container --- */
            .search-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #1b1b33;
            border: 1.5px solid rgba(0, 255, 255, 0.2);
            border-radius: 40px;
            padding: 5px 8px;
            width: 80%;
            max-width: 550px;
            transition: box-shadow 0.3s ease, border 0.3s ease;
            }

            .search-bar:focus-within {
            border: 1.5px solid #00ffff;
            box-shadow: 0 0 14px rgba(0, 255, 255, 0.25);
            }

            /* --- Input Field --- */
            .search-input {
            flex: 1;
            padding: 14px 18px;
            border: none;
            outline: none;
            background: transparent;
            color: #e0e0e0;
            font-size: 1rem;
            font-family: "Poppins", sans-serif;
            letter-spacing: 0.5px;
            }

            .search-input::placeholder {
            color: #888;
            font-style: italic;
            }

            /* --- Button --- */
            .search-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 18px;
            border: none;
            border-radius: 30px;
            background: linear-gradient(90deg, #3b82f6, #8a2be2);
            color: #fff;
            cursor: pointer;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            }

            .search-btn:hover {
            transform: scale(1.07);
            box-shadow: 0 0 12px rgba(138, 43, 226, 0.5);
            }

            /* --- SVG Icon --- */
            .search-icon {
            width: 22px;
            height: 22px;
            color: white;
            transition: color 0.3s ease;
            }

            .search-btn:hover .search-icon {
            color: #00ffff;
            }

            /* --- Responsive --- */
            @media (max-width: 768px) {
            .search-bar {
                width: 90%;
                padding: 4px 6px;
            }

            .search-input {
                font-size: 0.95rem;
            }

            .search-btn {
                font-size: 0.9rem;
                padding: 8px 14px;
            }

            .search-icon {
                width: 20px;
                height: 20px;
            }
            }
        `}</style>
        </div>
    );
};

export default SearchBar;
