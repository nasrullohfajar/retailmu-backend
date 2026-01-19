import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import categoryRoutes from './routes/master/category.route';

const app = express();

const allowedOrigins = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

export default app;
