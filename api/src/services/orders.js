import {ordersCollection} from "../config/db/models/orders.js";

export const getAllOrders = async () => {
    const orders = await ordersCollection.find();

    return orders;
};