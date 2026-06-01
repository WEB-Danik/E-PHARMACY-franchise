import {getAllProduct, getProductById} from "../services/products.js";
import mongoose from "mongoose";

export const getProductController = async (req, res) => {
    const products = await getAllProduct();

    res.status(200).json({
        data: products,
    });
};

export const getProductByIdController = async (req, res, next) => {
  const {productId} = req.params;

    if (!mongoose.isValidObjectId(productId)) {
        const error = new Error('Invalid product id');
        error.status = 400;
        next(error);
        return;
    }

  const product = await getProductById(productId);

    if (!product) {
        const error = new Error('Product not found');
        error.status = 404;
        next(error);
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found product with id ${productId}!`,
        data: product,
    });
};