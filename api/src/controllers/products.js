import {deleteProduct, getAllProduct, getProductById, postProduct, putProduct} from "../services/products.js";
import mongoose from "mongoose";
import {createHttpError} from "../utils/create-http-error.js";

const validateObjectId = (id, name, next) => {
    if (!mongoose.isValidObjectId(id)) {
        next(createHttpError(400, `Invalid ${name}`));
        return false;
    }

    return true;
};

export const getProductController = async (req, res, next) => {
    const {shopId} = req.params;

    if (!validateObjectId(shopId, "shop id", next)) return;

    const products = await getAllProduct(shopId);

    res.status(200).json({
        data: products,
    });
};

export const getProductByIdController = async (req, res, next) => {
    const {shopId, productId} = req.params;

    if (!validateObjectId(shopId, "shop id", next)) return;
    if (!validateObjectId(productId, "product id", next)) return;

    const product = await getProductById(shopId, productId);

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
    const {shopId} = req.params;
    const {photo, name, suppliers, stock, price, category} = req.body;

    if (!validateObjectId(shopId, "shop id", next)) return;

    const missingFields = [];

    if (!photo) missingFields.push("photo");
    if (!name) missingFields.push("name");
    if (!suppliers) missingFields.push("suppliers");
    if (stock === undefined || stock === null) missingFields.push("stock");
    if (price === undefined || price === null) missingFields.push("price");
    if (!category) missingFields.push("category");

    if (missingFields.length > 0) {
        return next(
            createHttpError(
                400,
                `Missing required fields: ${missingFields.join(", ")}`
            )
        );
    }

    const product = await postProduct(shopId, req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a product!",
        data: product,
    });
};

export const upsertProductController = async (req, res, next) => {
    const {shopId, productId} = req.params;

    if (!validateObjectId(shopId, "shop id", next)) return;
    if (!validateObjectId(productId, "product id", next)) return;

    const result = await putProduct(shopId, productId, req.body, {upsert: true});

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
    const {shopId, productId} = req.params;

    if (!validateObjectId(shopId, "shop id", next)) return;
    if (!validateObjectId(productId, "product id", next)) return;

    const product = await deleteProduct(shopId, productId);

    if (!product) {
        return next(createHttpError(404, 'Product not found'));
    }

    res.status(204).send();
};
