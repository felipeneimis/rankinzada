import cors from "cors";
import express, { Application } from "express";
import logger from "morgan";
import { API_PREFIX } from "./constants";
import { errorHandler } from "./middlewares/error.middleware";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(logger("dev"));
app.use(
  cors({
    origin: "*", // Please don't do this in real-world apps
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: false }));

app.use(API_PREFIX, routes);
app.use(errorHandler);

export default app;
