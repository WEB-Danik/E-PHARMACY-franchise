import {productCollection} from "../config/db/models/products.js";

export const getAllProduct = async (shopId) => {
    const filter = shopId ? {shopId} : {};
    const products = await productCollection.find(filter);
    return products;
};

export const getProductById = async (shopId, productId) => {
    const product = await productCollection.findOne({_id: productId, shopId});
    return product;
};

export const postProduct = async (shopId, payload) => {
    const product = await productCollection.create({...payload, shopId});
    return product;
};

export const putProduct = async (shopId, productId, payload, options = {}) => {
    const updatePayload = {...payload};
    delete updatePayload.shopId;

    const rawResult = await productCollection.findOneAndUpdate(
        {_id: productId, shopId},
        updatePayload,
        {
            new: true,
            includeResultMetadata: true,
            runValidators: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        product: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteProduct = async (shopId, productId) => {
    const product = await productCollection.findOneAndDelete({_id: productId, shopId});
    return product;
};
