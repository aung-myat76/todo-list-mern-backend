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

router.post("/", [check("title").isLength({ min: 5, max: 50 })], postTodo);

router.put("/", putTodo);

router.delete("/", deleteTodo);

export default router;
