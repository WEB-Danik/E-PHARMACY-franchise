import mongoose from "mongoose";

const SuppliersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    suppliers: {
        type: String,
        enum: ["Beximco", "ACI", "Uniliver", "Square", "Acme"],
        required: true,
    },
    date: {
        type: String, // краще Date, але якщо зберігаєте рядком "September 19, 2023", то String
    },
    amount: {
        type: String, // якщо залишаєте знак валюти "৳ 2698.50", то String.
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Deactive"], // додайте ваші статуси
        default: "Active"
    }
});

export const SuppliersCollection = mongoose.model("suppliers", SuppliersSchema);