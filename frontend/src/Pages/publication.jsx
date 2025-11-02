import { useState, useEffect } from "react";
import SearchBar from "../components/publications/SearchBar";
import Loader from "../components/publications/Loader";
import PublicationCard from "../components/publications/PublicationCard";

const Publications = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // always an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPublications = async (searchQuery, currentPage = 1) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:3001/api/publications?query=${searchQuery}`
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      console.log("Fetched data:", data);

      // ✅ Safe handling: even if backend returns unexpected format
      setResults(Array.isArray(data) ? data : []);

      setTotalPages(data.totalPages && !isNaN(data.totalPages) ? data.totalPages : 1);
    } catch (err) {
      console.error("Error fetching publications:", err);
      setError("Something went wrong. Please try again.");
      setResults([]); // fallback to empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      fetchPublications(query, page);
    }
  }, [query, page]);

  return (
    <section className="publications-page">
      <SearchBar
        onSearch={(q) => {
          setQuery(q);
          setPage(1);
        }}
      />

      {loading && <Loader />}

      {!loading && error && <p className="error-msg">{error}</p>}

      {!loading && !error && results && results.length === 0 && query && (
        <p className="no-results">No results found for “{query}”</p>
      )}

      {!loading && results && results.length > 0 && (
        <>
          <div className="results-container">
            {results.map((pub, index) => (
              <PublicationCard key={index} publication={pub} />
            ))}
          </div>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      <style>{`
        .publications-page {
          min-height: 100vh;
          background: #24243e;
          color: white;
          padding: 100px 20px 50px;
          text-align: center;
        }

        .results-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
          padding: 0 40px;
        }

        .pagination {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .pagination button {
          background: linear-gradient(90deg, #3b82f6, #8a2be2);
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination button:hover:not(:disabled) {
          box-shadow: 0 0 15px rgba(0,255,255,0.5);
          transform: scale(1.05);
        }

        .pagination button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .error-msg, .no-results {
          color: #ff7b7b;
          margin-top: 30px;
          font-size: 1.1rem;
        }
      `}</style>
    </section>
  );
};

export default Publications;
