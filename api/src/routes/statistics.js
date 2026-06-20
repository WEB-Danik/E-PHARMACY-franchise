import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrl-wrapper.js";
import {getAllStatisticsController} from "../controllers/statistics.js";

const router = Router();

router.get("/statistics", ctrlWrapper(getAllStatisticsController));

export default router;