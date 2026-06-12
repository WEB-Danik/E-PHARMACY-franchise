import {deleteProduct, getAllProduct, getProductById, postProduct, putProduct} from "../services/products.js";
import mongoose from "mongoose";
import {createHttpError} from "../utils/create-http-error.js";
import products from "../routes/products.js";

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

export const postProductController = async (req, res, next) => {
    const { photo, name, suppliers, stock, price, category } = req.body;

    const missingFields = [];

    if (!photo) missingFields.push("photo");
    if (!name) missingFields.push("name");
    if (!suppliers) missingFields.push("suppliers");
    if (!stock) missingFields.push("stock");
    if (!price) missingFields.push("price");
    if (!category) missingFields.push("category");

    if (missingFields.length > 0) {
        return next(
            createHttpError(
                400,
                `Missing required fields: ${missingFields.join(", ")}`
            )
        );
    }

    const product = await postProduct(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a product!",
        data: product,
    });
};

export const upsertProductController = async (req, res, next) => {
    const { productId } = req.params;

    const result = await putProduct(productId, req.body, {upsert: true});

    if (!result) {
        next(createHttpError(404, 'Product not found'));
        return;
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a product!`,
        data: result,
    });

};

export const deleteProductController = async (req, res, next) => {
    const { productId } = req.params;

    const product = await deleteProduct(productId);

    if (!product) {
        return next(createHttpError(404, 'Product not found'));
    }

    res.status(204).send();
};