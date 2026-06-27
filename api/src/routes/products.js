import {Router} from "express";
import {
    deleteProductController,
    getProductByIdController,
    getProductController,
    postProductController,
    upsertProductController
} from "../controllers/products.js";
import {ctrlWrapper} from "../utils/ctrl-wrapper.js";

const router = Router({mergeParams: true});

router.get("/product", ctrlWrapper(getProductController));
router.get("/product/:productId", ctrlWrapper(getProductByIdController));
router.post("/product/add", ctrlWrapper(postProductController));
router.put("/product/:productId/edit", ctrlWrapper(upsertProductController));
router.delete("/product/:productId/delete", ctrlWrapper(deleteProductController));

export default router;
