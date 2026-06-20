import {getAllOrders} from "../services/orders.js";
import {getIncomeExpenses} from "../services/income-expenses.js";
import {getSuppliers} from "../services/suppliers.js";
import {getAllProduct} from "../services/products.js";
import {getCustomers} from "../services/customers.js";

export const getAllStatisticsController = async (req, res) => {
    const orders = await getAllOrders();
    const incomeExpenses = await getIncomeExpenses();
    const suppliers = await getSuppliers();
    const products = await getAllProduct();
    const customers = await getCustomers();

    res.status(200).json({
        data: {
            orders: orders,
            incomeExpenses: incomeExpenses,
            suppliers: suppliers,
            products: products,
            customers: customers,
        },
    });
}