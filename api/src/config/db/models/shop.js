import mongoose from "mongoose";
import {pharmaciesCollection} from "./pharmacies.js";

const shopSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        ownerName: {
            type: String,
            required: true,
        },
        logoShop: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [5, "Email is too short"],
            maxlength: [254, "Email is too long"],
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                "Invalid email format",
            ],
            index: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            match: [
                /^[\p{L}\d\s.,'/-]+$/u,
                "Invalid address",
            ],
        },
        city: {
            type: String,
            required: true,
            minlength: 3,
        },
        postalIndex: {
            type: String,
            required: [true, "Postal index is required"],
            trim: true,
            match: [/^\d{5}$/, "Postal index must contain exactly 5 digits"],
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            trim: true,
            match: [
                /^\+?[0-9]{10,15}$/,
                "Invalid phone number",
            ],
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

shopSchema.post("save", async function (doc) {
    try {
        await pharmaciesCollection.create({
            shopId: doc._id,
            name: doc.name,
            address: doc.address,
            city: doc.city,
            phone: doc.phone,
            rating: doc.rating,
        });
        console.log(`Shop "${doc.name}" copied to pharmacies collection.`);
    } catch (error) {
        console.error("Failed to copy shop to pharmacies:", error);
    }
});

export const shopCollection = mongoose.model("shop", shopSchema);
