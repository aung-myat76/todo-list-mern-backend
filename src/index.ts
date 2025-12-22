import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";

import todoRoute from "./routes/todoRoute";

const app = express();

// using modules
app.use(bodyParser.json());

// routes
app.use("/api/todos", todoRoute);

// server
app.listen(5000, () => {
    console.log("Server is running...");
});
