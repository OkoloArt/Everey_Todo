import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error: unknown) {
    console.error("Error during registration:", error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.loginUser(req.body);
    res.status(200).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message || "Login failed" });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
