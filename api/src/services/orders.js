import {ordersCollection} from "../config/db/models/orders.js";
import {productCollection} from "../config/db/models/products.js";

export const getAllOrders = async () => {
    const orders = await ordersCollection.find();

    return orders;
};

export const getClientById = async (clientId) => {
    const client = await ordersCollection.findById(clientId);

    if (!client) return null;

    const product = await productCollection.findOne({
        id: client.products,
    });

    return {
        customer: client,
        product,
    };
};