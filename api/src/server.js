import express from 'express';
import {pinoHttp} from "pino-http";
import cors from 'cors';
import dotenv from 'dotenv';
import {getEnvVar} from "./utils/getEnvVar.js";
import productRouter from "./routes/products.js";
import statisticsRouter from "./routes/statistics.js";
import shopRouter from "./routes/shop.js";


export const app = express();

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {

    app.use(express.json({
        type: 'application/json',
    }));
    app.use(cors());

    app.use(
        pinoHttp({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/api', (req, res) => {
        res.json({
            message: 'Hello world!',
        });
    });

    app.use('/api', shopRouter);
    app.use('/api/shop/:shopId', productRouter);
    app.use('/api', statisticsRouter);

    app.use((req, res) => {
        res.status(404).json({
            message: 'Route not found.',
        });
    });

    app.use((err, req, res, next) => {
        const statusCode = err.status || 500;

        res.status(statusCode).json({
            message: err.message || 'Something went wrong',
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};