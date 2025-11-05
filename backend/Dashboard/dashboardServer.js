import express from 'express';
import { port } from '../Dashboard/config/config.js'
import patientRoutes from '../Dashboard/route/patientRoute.js';
import researcherRoutes from '../Dashboard/route/researcherRoutes.js';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // your frontend port
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Dashboard Server!");
});

app.use("/api/dashboard/patients", patientRoutes)
app.use("/api/dashboard/researchers", researcherRoutes)

app.listen(port, () => {
    console.log(`Dashboard server is running on http://localhost:${port}`);
});