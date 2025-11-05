import express from "express";
import { createResearcher, fetchResearcherByEmail, fetchResearcherById } from "../controller/ResearcherController.js";

const router = express.Router();

router.get("/:id",fetchResearcherById);
router.post("/",createResearcher);
router.post("/email",fetchResearcherByEmail)

export default router;