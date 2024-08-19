import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

const todoService = new TodoService();

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await todoService.create(userId, req.body);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await todoService.update(productId, req.body);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await todoService.delete(productId);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
};

export const getTodosByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await todoService.getTodos(userId);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
};
