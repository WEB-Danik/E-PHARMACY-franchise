import {CustomerCollection} from "../config/db/models/customers.js";

export const getCustomers = async () => {
  const customers = await CustomerCollection.find();
  return customers;
};