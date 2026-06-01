import {Router} from "express";
import {getProductByIdController, getProductController} from "../controllers/products.js";
import {ctrlWrapper} from "../utils/ctrl-wrapper.js";

const router = Router();

router.get("/product", ctrlWrapper(getProductController));
router.get("/product/:productId", ctrlWrapper(getProductByIdController));

export default router;