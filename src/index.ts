import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";

import todoRoute from "./routes/todoRoute";
import HttpError from "./models/HttpError";

const app = express();

// using modules
app.use(bodyParser.json());

// routes
app.use("/api/todos", todoRoute);

// fallback route
app.use("/", (req: Request, res: Response, next: NextFunction) => {
    return next(new HttpError("Page not Found", 404));
});

// error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        return res
            .status(+err.code || 500)
            .json({ message: err.message || "Something went wrong!" });
    }
});

// server
app.listen(5000, () => {
    console.log("Server is running...");
});
