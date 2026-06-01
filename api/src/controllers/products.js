import {getAllProduct, getProductById} from "../services/products.js";
import mongoose from "mongoose";
import {createHttpError} from "../utils/create-http-error.js";

export const getProductController = async (req, res) => {
    const products = await getAllProduct();

    res.status(200).json({
        data: products,
    });
};

export const getProductByIdController = async (req, res, next) => {
  const {productId} = req.params;

    if (!mongoose.isValidObjectId(productId)) {
        return next(createHttpError(400, "Invalid product id"));
    }

  const product = await getProductById(productId);

    if (!product) {
        return next(createHttpError(404, 'Product not found'));
    }

    res.json({
        status: 200,
        message: `Successfully found product with id ${productId}!`,
        data: product,
    });
};