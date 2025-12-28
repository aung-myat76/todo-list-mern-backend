import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import HttpError from "../models/HttpError";

type Todo = {
    id: string;
    title: string;
    isDone: boolean;
};

const todos: Todo[] = [
    {
        id: "t1",
        title: "Do the laundry",
        isDone: true
    },
    {
        id: "t2",
        title: "Read Book",
        isDone: false
    }
];

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(todos);
};

export const postTodo = (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;

    const err = validationResult(req);

    if (!err.isEmpty()) {
        return next(new HttpError("Invalid input", 403));
    }

    const newTodo = { id: Math.random().toString(), title, isDone: false };

    todos.push(newTodo);

    return res
        .status(201)
        .json({ message: "Created todo", todos, todo: newTodo });
};

export const putTodo = (req: Request, res: Response, next: NextFunction) => {
    const { todo }: { todo: Todo } = req.body;

    const updatedTodoIndex = todos.findIndex((t) => t.id === todo.id);
    if (!updatedTodoIndex) {
        return next(new HttpError("Could not find the todo", 404));
    }

    const updatedTodo = todos[updatedTodoIndex];
    todos[updatedTodoIndex] = {
        id: updatedTodo!.id,
        title: updatedTodo!.title,
        isDone: todo.isDone || updatedTodo!.isDone
    };

    return res.status(200).json({
        message: "Updated Todo",
        todo: todos[updatedTodoIndex],
        todos: todos
    });
};

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    const { todoId } = req.body;

    const filteredTodos = todos.filter((t) => t.id !== todoId);
    console.log(filteredTodos);

    return res
        .status(200)
        .json({ message: "Deleted todo", todos: filteredTodos });
};
