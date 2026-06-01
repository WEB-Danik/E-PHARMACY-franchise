import mongoose from "mongoose";
import {ref} from "../refs.js";

export async function connectDB() {
    try {
        await mongoose.connect(
            `mongodb+srv://${ref.user}:${ref.pwd}@${ref.url}/${ref.db}?retryWrites=true&w=majority`
        );
    } catch (e) {
        console.log('Error while setting up mongo connection', e);
        throw e;
    }
};