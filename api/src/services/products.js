import {productCollection} from "../config/db/models/products.js";

export const getAllProduct = async () => {
    const products = await productCollection.find();
    return products;
};
export const getProductById = async (productId) => {
    const product = await productCollection.findById(productId);
    return product;
};
export const postProduct = async (payload) => {
    const product = await productCollection.create(payload);
    return product;
};
export const putProduct = async (productId, payload, options = {}) => {
    const rawResult = await productCollection.findOneAndUpdate(
        {_id: productId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
        );

    if (!rawResult || !rawResult.value) return null;

    return {
        product: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteProduct = async (productId) => {
    const product = await productCollection.findByIdAndDelete({
        _id: productId,
    });
    return product;
};