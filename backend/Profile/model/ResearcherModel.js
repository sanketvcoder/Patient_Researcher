import pool from "../db/db.js";

export const createResearcherTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS researcher (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        basic_bio TEXT,
        interest TEXT[],
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100),
        address TEXT,
        phone_no VARCHAR(20) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await pool.query(query);
};

export const addResearcher = async (data) => {
    const {
        name,
        email,
        basic_bio,
        interest,
        city,
        state,
        country,
        address,
        phone_no,
    } = data;

    const result = await pool.query(
        `
        INSERT INTO researcher 
        (name, email, basic_bio, interest, city, state, country, address, phone_no)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `,
        [name, email, basic_bio, interest, city, state, country, address, phone_no]
    );

    return result.rows[0];
};

// this is for admin
export const getAllResearchers = async () => {
    const result = await pool.query("SELECT * FROM researcher ORDER BY id ASC");
    return result.rows;
};



