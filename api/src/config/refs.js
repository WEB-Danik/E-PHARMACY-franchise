import dotenv from "dotenv";
import {getEnvVar} from "../utils/getEnvVar.js";

dotenv.config();


export const ref = {
    user: getEnvVar('MONGODB_USER'),
    pwd: getEnvVar('MONGODB_PASSWORD'),
    url: getEnvVar('MONGODB_URL'),
    db: getEnvVar('MONGODB_DB'),
}