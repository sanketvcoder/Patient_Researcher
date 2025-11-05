import express from 'express'
import { port } from './config/config.js';
import pool from './db/db.js';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import researcherRoutes from './routes/researcherRoutes.js';
import { createPatientTable } from './model/PatientModel.js';
import { createResearcherTable } from './model/ResearcherModel.js';
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello Sanket !!");
})
app.use(cors({
  origin: "http://localhost:5173",  // your frontend
  credentials: true,
}));
createPatientTable();
createResearcherTable();
app.use("/api/patients", patientRoutes);
app.use("/api/researchers", researcherRoutes);
const startServer= async()=>{
    try{
        await pool.connect()
        console.log("Connected  to PostgreSQL successfully")

        app.listen(port,()=>{
            console.log(`server is running on http://localhost:${port}`)
        })


    }catch(error){
        console.error("Database connection failed: ",error)
        process.exit(1);
    }
}

startServer();
