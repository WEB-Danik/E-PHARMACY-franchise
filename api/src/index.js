import {startServer} from "./server.js";
import {connectDB} from "./config/db/init-db.js";

const bootstrap = async () => {
    await connectDB();
    startServer();
};

bootstrap();