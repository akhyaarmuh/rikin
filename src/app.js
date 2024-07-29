import ip from 'ip';
import open from 'open';
import path from 'path';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

import errorHandler from './middlewares/error-handler.js';
import { PORT, API_VERSION, NODE_ENV, __dirname } from './secret.js';

import rootRouter from './routes/index.js';

export const prismaClient = new PrismaClient();

const app = express();

const port = PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(
  cors({ credentials: true, origin: ['http://localhost:5173', 'http://localhost:4173'] })
);
app.use(express.json());
app.use(cookieParser());

app.use(`/${API_VERSION}`, rootRouter);

// client handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// set error middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.listen(port, ip.address(), () => {
  console.log(`[server]: Server is running at: http://${ip.address()}:${port}`);
  if (NODE_ENV !== 'development') open(`http://localhost:${port}`, { app: 'chrome' });
});
