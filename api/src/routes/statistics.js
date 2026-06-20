import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrl-wrapper.js";
import {getAllStatisticsController, getClientGoodsController} from "../controllers/statistics.js";

const router = Router();

router.get("/statistics", ctrlWrapper(getAllStatisticsController));
router.get("/statistics/:clientId/goods", ctrlWrapper(getClientGoodsController));

export default router;