import express, { Application, Request, Response } from "express";
import logger from 'morgan';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(logger('dev'))
app.use(
  cors({
    origin: '*', // Please don't do this in real-world apps
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }),
)
app.use(express.urlencoded({ extended: false }));

export default app;