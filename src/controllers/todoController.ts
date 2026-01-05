import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Todo from "../models/Todo";

import HttpError from "../models/HttpError";
import mongoose from "mongoose";

type Todo = {
    id: string;
    title: string;
    isDone: boolean;
};

// const todos: Todo[] = [
//     {
//         id: "t1",
//         title: "Do the laundry",
//         isDone: true
//     },
//     {
//         id: "t2",
//         title: "Read Book",
//         isDone: false
//     }
// ];

export const getTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todos = await Todo.find().lean();
        const formattedTodos = todos.map((todo) => {
            return { ...todo, id: todo._id.toString() };
        });
        return res
            .status(200)
            .json({ message: "Fetched todos", todos: formattedTodos });
    } catch (err) {
        return next(new HttpError("Could not fetch todos", 500));
    }
};

export const postTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const title = req.body.title;

    const err = validationResult(req);

    if (!err.isEmpty() && err) {
        return next(new HttpError(err.array()[0]!.msg, 403));
    }

    const newTodo = new Todo({
        title,
        isDone: false
    });

    try {
        const result = await newTodo.save();
        console.log(result);
        return res.status(201).json({
            message: "created todo",
            todo: result.toObject({ getters: true })
        });
    } catch (err) {
        return next(new HttpError("Could not created todo", 500));
    }
};

export const putTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { todoId, isDone } = req.body;

    try {
        const updatedTodo = await Todo.findById(todoId);

        console.log(updatedTodo);

        if (!updatedTodo) {
            return next(
                new HttpError("Could not find the todo to update", 404)
            );
        }

        updatedTodo.isDone = isDone;
        const result = await updatedTodo.save();

        return res.status(200).json({
            message: "Updated Todo",
            todo: result.toObject({ getters: true })
        });
    } catch (err) {
        return next(new HttpError("Could not update todo", 500));
    }
};

export const deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { todoId } = req.body;
    try {
        const todo = await Todo.findById(todoId);

        if (todo) {
            await todo.deleteOne();
            return res.status(200).json({ message: "Deleted todo", todoId });
        } else {
            return next(new HttpError("Could not find todo to delete", 500));
        }
    } catch (err) {
        return next(new HttpError("Could not delete todo", 500));
    }
};
