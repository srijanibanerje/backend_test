import express from "express";
import { getAllRanks, getUserRanks, saveRankAchievement } from "../controllers/rankController.js";

const router = express.Router();


router.post("/save-rank", saveRankAchievement);
router.get("/all", getAllRanks);
router.get("/user/:userId", getUserRanks);
export default router;