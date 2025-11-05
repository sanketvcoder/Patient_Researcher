import express from 'express';
import { patientDashboardClincalTrial, patientProfile, patientPublication, patientToKnowExpert } from '../controller/PatientController.js';


const router = express.Router();

router.get("/",patientDashboardClincalTrial)
router.get("/publications", patientPublication);
router.get("/profile", patientProfile);
router.get("/toKnowExpert", patientToKnowExpert);
export default router;