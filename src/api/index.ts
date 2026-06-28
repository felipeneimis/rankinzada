import express, { Request, Response } from "express";
import {env} from "../config/env";
import logger from 'morgan';
import cors from 'cors';

const app = express();
const port = env.APP_PORT || 3000;

app.use(express.json());
app.use(logger('dev'))
app.use(cors());
app.use(express.urlencoded({ extended: false }));

export default app;