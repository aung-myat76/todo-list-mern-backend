import { Router } from "express";

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

router.post("/", postTodo);

router.put("/:todoId", putTodo);

router.delete("/:todoId", deleteTodo);

export default router;
