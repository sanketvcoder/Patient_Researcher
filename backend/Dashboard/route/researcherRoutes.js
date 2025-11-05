import express from 'express';
import { researcherDashboardClincalTrial, researcherProfile, researcherPublication } from '../controller/ResearcherController.js';

const router = express.Router();

router.get("/",researcherDashboardClincalTrial)
router.get("/publications", researcherPublication);
router.get("/profile", researcherProfile);
export default router;