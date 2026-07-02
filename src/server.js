import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import menuRoutes from "./routes/menuRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(logger);
app.use(cors());


app.use(menuRoutes);

//мідлвари

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
