import express from 'express';
import { createPatient, fetchPatientByPatient, fetchPatientId } from '../controller/PatientController.js';


const router = express.Router();

router.get("/:id",fetchPatientId);
router.post("/",createPatient);
router.post("/email",fetchPatientByPatient);

export default router;