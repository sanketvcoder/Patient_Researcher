import express from "express";
import { createResearcher, fetchResearcherById } from "../controller/ResearcherController.js";

const router = express.Router();

router.get("/:id",fetchResearcherById);
router.post("/",createResearcher);

export default router;