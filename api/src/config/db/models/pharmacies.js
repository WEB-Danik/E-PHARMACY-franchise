import mongoose from "mongoose";

const pharmaciesSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    phone: {type: String, required: true},
    rating: {type: Number, default: 0}
});

// Третім аргументом ЯВНО вказуємо "pharmacies", як на вашому скріншоті!
export const pharmaciesCollection = mongoose.model('pharmacies', pharmaciesSchema);