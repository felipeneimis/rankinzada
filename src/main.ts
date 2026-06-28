import express, { Request, Response } from "express";

const app = express();
const port = process.env.APP_PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/user", (req: Request, res: Response) => {
    res.status(201).send("User created successfully!");
});

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
