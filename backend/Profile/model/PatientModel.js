import pool from "../db/db.js"

export const createPatientTable = async()=>{
    const query = `
    create table if not exists patient(
    id serial primary key,
    name varchar(100) not null,
    email varchar(100) unique not null,
    basic_bio text,
    diseases text[],
    city varchar(100),
    state varchar(100),
    country varchar(100),
    address TEXT,
    phone_no varchar(20) unique,
    created_at timestamp default current_timestamp
    );
    `
    await pool.query(query)
}

export const addPatient = async (data) => {
    const {
        name,
        email,
        basic_bio,
        diseases,
        city,
        state,
        country,
        address,
        phone_no,
    } = data;

    const result = await pool.query(
    `
    INSERT INTO patient
    (name, email, basic_bio, diseases, city, state, country, address, phone_no)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `,
    [name, email, basic_bio, diseases, city, state, country, address, phone_no]
    );

    return result.rows[0];
};


export const getAllPatients = async () => {
    const result = await pool.query('SELECT * FROM patient ORDER BY id ASC');
    return result.rows;
};
