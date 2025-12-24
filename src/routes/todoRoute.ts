import { Router } from "express";
import { check } from "express-validator";

import {
    deleteTodo,
    getTodo,
    getTodos,
    postTodo,
    putTodo,
} from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);

router.get("/:todoId", getTodo);

router.post("/", [check("title").isLength({ min: 5, max: 50 })], postTodo);

router.put("/:todoId", [check("title").isLength({ min: 5, max: 50 })], putTodo);

router.delete("/:todoId", deleteTodo);

export default router;
