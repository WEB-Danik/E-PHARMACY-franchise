import {model, Schema} from "mongoose";

const productSchema = new Schema({
        id: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        suppliers: {
            type: String,
            enum: ["Square", "Acme", "Beximco", "ACI", "Uniliver"],
            required: true,
        },
        stock: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["Hand", "Leg", "Medicine", "Heart", "Head"],
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    });


export const productCollection = model('products', productSchema);