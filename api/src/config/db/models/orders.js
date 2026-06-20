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
        match: [/^\s*[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}\s*$/, 'Будь ласка, вкажіть коректний email']
    },
    products: {
        type: String, // Оскільки в JSON значення в лапках "12"
        required: true
    },
    price: {
        type: String, // Оскільки в JSON значення в лапках "890.66"
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Completed', 'Cancelled'] // Додано валідацію статусів з ваших прикладів
    },
    order_date: {
        type: String, // Оскільки дата записана рядком "July 31, 2023"
        required: true
    }
}, {
    timestamps: true
});

export const ordersCollection = mongoose.model("orders", ordersSchema);