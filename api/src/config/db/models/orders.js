import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\s*[\w.-]+@([\w-]+\.)+[\w-]{2,4}\s*$/, "Invalid email"]
    },
    products: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Processing", "Confirmed", "Shipped", "Delivered", "Completed", "Cancelled"]
    },
    order_date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const ordersCollection = mongoose.model("orders", ordersSchema);
