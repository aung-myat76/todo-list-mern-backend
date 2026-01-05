import { Router } from "express";
import { check } from "express-validator";

import {
    deleteTodo,
    getTodos,
    postTodo,
    putTodo
} from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);

router.post(
    "/",
    [
        check("title")
            .isLength({ min: 5, max: 50 })
            .withMessage("Title must be at least 5 - 50 characters!")
    ],
    postTodo
);

router.put("/", putTodo);

router.delete("/", deleteTodo);

export default router;
