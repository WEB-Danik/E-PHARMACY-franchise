import {model, Schema} from "mongoose";

const productSchema = new Schema({
        shopId: {
            type: Schema.Types.ObjectId,
            ref: "shop",
            required: true,
            index: true,
        },
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
            type: Number,
            required: true,
            min: 0,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
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
