import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    photo: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    spent: {
        type: Number,
        required: true,
        default: 0
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    register_date: {
        type: String
    }
});

export const CustomerCollection = mongoose.model('customer', CustomerSchema);