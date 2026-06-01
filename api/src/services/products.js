import {productCollection} from "../config/db/models/products.js";

export const getAllProduct = async () => {
    const products = await productCollection.find();
    return products;
};
export const getProductById = async (productId) => {
    const product = await productCollection.findById(productId);
    return product;
};