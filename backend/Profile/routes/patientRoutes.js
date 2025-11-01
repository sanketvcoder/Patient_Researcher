import express from 'express';
import { createPatient, fetchPatientId } from '../controller/PatientController.js';

const router = express.Router();

router.get("/:id",fetchPatientId);
router.post("/",createPatient);

export default router;