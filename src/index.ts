import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";

import todoRoute from "./routes/todoRoute";
import HttpError from "./models/HttpError";

const app = express();
const MONGODB_URI =
    "mongodb+srv://aung_myat:zz762389@nodejs.4lf0iqx.mongodb.net/todo-app?retryWrites=true&w=majority&appName=Nodejs";

// using modules
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"]
    })
);
// app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("DB is connected");
        app.listen(5000, () => {
            console.log("Server is running...");
        });
    })
    .catch((err) => {
        console.log(err);
    });
