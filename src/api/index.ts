import express, { Application, Request, Response } from "express";
import logger from 'morgan';
import cors from 'cors';
import routes from "./routes";
import { API_PREFIX } from "./constants";
import { Pool } from "pg";
import { errorHandler } from "./middlewares/error.middleware";

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

app.use(API_PREFIX, routes);
app.use(errorHandler)

export default app;
