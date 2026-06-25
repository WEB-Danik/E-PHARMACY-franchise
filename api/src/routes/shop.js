import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrl-wrapper.js";
import {createShopController, getShopByIdController, updateShopController} from "../controllers/shop.js";

const router = new Router();

router.post('/shop/create', ctrlWrapper(createShopController));
router.get('/shop/:shopId', ctrlWrapper(getShopByIdController));
router.put('/shop/:shopId/update', ctrlWrapper(updateShopController));

export default router;