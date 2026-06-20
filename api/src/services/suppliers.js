import {SuppliersCollection} from "../config/db/models/suppliers.js";

export const getSuppliers = async () => {
    const suppliers = await SuppliersCollection.find();
    return suppliers;
};