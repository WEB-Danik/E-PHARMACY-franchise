import {IncomeExpensesCollection} from "../config/db/models/income-expenses.js";

export const getIncomeExpenses = async () => {
    const incomeExpenses = await IncomeExpensesCollection.find();

    return incomeExpenses;
};