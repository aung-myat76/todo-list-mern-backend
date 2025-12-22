import { Request, Response, NextFunction } from "express";

type Todo = {
    id: string;
    title: string;
    isDone: boolean;
};

const todos: Todo[] = [
    {
        id: "t1",
        title: "Do the laundry",
        isDone: false,
    },
    {
        id: "t2",
        title: "Read Book",
        isDone: false,
    },
];

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(todos);
};

export const getTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.todoId;

    const todo = todos.find((t) => t.id === todoId);

    return res.status(200).json(todo);
};

export const postTodo = (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;

    todos.push({ id: Math.random().toString(), title, isDone: false });

    return res.status(201).json({ message: "Created todo", todos });
};

export const putTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.todoId;
    const todo: Todo = req.body;

    const updatedTodoIndex = todos.findIndex((t) => t.id === todoId);
    const updatedTodo = todos[updatedTodoIndex];
    todos[updatedTodoIndex] = {
        id: updatedTodo!.id,
        title: todo.title || updatedTodo!.title,
        isDone: todo.isDone || updatedTodo!.isDone,
    };

    return res.status(200).json({
        message: "Updated Todo",
        updatedTodo: todos[updatedTodoIndex],
        todos: todos,
    });
};

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.todoId;

    const filteredTodos = todos.filter((t) => t.id !== todoId);

    return res
        .status(200)
        .json({ message: "Deleted todo", todos: filteredTodos });
};
