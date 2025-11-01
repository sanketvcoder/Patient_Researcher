import pkg from 'pg'
import dotenv from 'dotenv';
import { database, host, password, pg_port, port, user } from '../config/config.js'
dotenv.config();
const {Pool} =pkg
const pool= new Pool({
    host: host,
    port: pg_port,
    user: user,
    password: password,
    database: database
})

pool.connect().then(()=>console.log('connected  to PostgreSQL successfully')).catch((err)=>console.log('Database connection failed:',err))

export default pool;