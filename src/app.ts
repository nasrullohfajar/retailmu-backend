import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import categoryRoutes from './routes/master/category.route';
import supplierRoutes from './routes/master/supplier.route';
import storageRoutes from './routes/master/storage.route';
import userRoutes from './routes/master/user.route';
import authRoutes from './routes/master/auth.route';

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
app.use(cookieParser());

app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/storages', storageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;
