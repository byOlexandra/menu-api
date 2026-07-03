import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import menuRoutes from './routes/menuRoutes.js';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT ?? 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,

  handler: (req, res, next) => {
    const lang = req.query.lang === 'ua' ? 'ua' : 'en';
    const message =
      lang === 'ua'
        ? 'Занадто багато запитів з цього IP, будь ласка, спробуйте знову через 15 хвилин.'
        : 'Too many requests from this IP, please try again after 15 minutes.';

    res.status(429).json({
      status: 'fail',
      statusCode: 429,
      message,
    });
  },
});

app.use(limiter);

app.use(express.json());
app.use(logger);
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Coffee Shop Menu API! Use /menu to get all products.'
  });
});

app.use(menuRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
