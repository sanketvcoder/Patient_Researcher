import { ArrowUpRight } from "lucide-react";

const PublicationCard = ({ publication }) => {
  if (!publication.link || publication.link === "N/A") return null;

  return (
    <div className="pub-card">
      <div className="pub-header">
        <h3 className="pub-title">
          <a href={publication.link} target="_blank" rel="noopener noreferrer">
            {publication.title}
          </a>
        </h3>
        <a
          href={publication.link}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link"
          title="View Publication"
        >
          <ArrowUpRight size={20} />
        </a>
      </div>

      <p className="authors">{publication.authors}</p>

      <p className="details">
        <strong>Publication:</strong> {publication.publication || "N/A"} <br />
        <strong>Year:</strong> {publication.year || "N/A"} <br />
        <strong>Source:</strong> {publication.source || "N/A"}
      </p>

      {publication.searchMatch && (
        <p className="abstract">
          <strong>Abstract:</strong> {publication.searchMatch}
        </p>
      )}

      <p className="citations">
        <strong>Citations:</strong>{" "}
        {publication.citations && publication.citationsLink ? (
          <a
            href={publication.citationsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {publication.citations}
          </a>
        ) : (
          "N/A"
        )}
      </p>

      <style>{`
        .pub-card {
          background: linear-gradient(145deg, #1b1b2f, #24243e);
          color: #e5e5e5;
          padding: 22px;
          border-radius: 16px;
          border: 1px solid rgba(0, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.08), inset 0 0 15px rgba(255, 255, 255, 0.02);
          transition: all 0.35s ease-in-out;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
        }

        /* glowing border pulse */
        .pub-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(90deg, rgba(0,255,255,0.4), rgba(138,43,226,0.4), rgba(59,130,246,0.4));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          animation: glow-border 4s linear infinite;
          pointer-events: none;
        }

        @keyframes glow-border {
          0% { opacity: 0.3; transform: rotate(0deg); }
          50% { opacity: 1; transform: rotate(180deg); }
          100% { opacity: 0.3; transform: rotate(360deg); }
        }

        .pub-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 28px rgba(0,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.03);
        }

        .pub-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pub-title a {
          color: #00ffff;
          text-decoration: none;
          font-size: 1.3rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          transition: color 0.3s ease;
        }

        .pub-title a:hover {
          color: #8a2be2;
        }

        .arrow-link {
          color: #00ffff;
          background: rgba(0,255,255,0.1);
          border-radius: 50%;
          padding: 6px;
          transition: all 0.25s ease;
        }

        .arrow-link:hover {
          transform: translateX(4px);
          background: rgba(138,43,226,0.2);
          color: #8a2be2;
        }

        .authors {
          color: #3b82f6;
          font-style: italic;
          font-size: 0.95rem;
        }

        .details strong {
          color: #00ffff;
        }

        .abstract {
          font-size: 0.95rem;
          color: #d0d0d0;
          line-height: 1.4;
        }

        .citations {
          font-size: 0.95rem;
        }

        .citations a {
          color: #00ffff;
          text-decoration: none;
        }

        .citations a:hover {
          color: #8a2be2;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .pub-card {
            padding: 16px;
          }

          .pub-title a {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicationCard;
