import mongoose from "mongoose";

const IncomeExpensesShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Income", "Error", "Expense"],
        required: true,
    }
});

export const IncomeExpensesCollection = mongoose.model('Income-Expenses', IncomeExpensesShema, "Income-Expenses");