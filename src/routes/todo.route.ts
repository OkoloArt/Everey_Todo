import { Router } from "express";
import {
  createTodo,
  getTodosByUser,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller";
import { CreateTodoDto, UpdateTodoDto } from "../dtos/todo.dto";
import { validateDto } from "../utils/validation.utils";

const router = Router();

/**
 * @openapi
 * /todo/getTodo/{id}:
 *   get:
 *     tags:
 *       - Todo
 *     summary: Get all to-dos for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of to-dos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/getTodo/:id", getTodosByUser);

/**
 * @openapi
 * /todo/create/{id}:
 *   post:
 *     tags:
 *       - Todo
 *     summary: Create a new to-do for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodo'
 *     responses:
 *       201:
 *         description: Created to-do
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Todo successfully added."
 */
router.post("/create/:id", validateDto(CreateTodoDto), createTodo);

/**
 * @openapi
 * /todo/update/{id}:
 *   patch:
 *     tags:
 *       - Todo
 *     summary: Update a to-do
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodo'
 *     responses:
 *       200:
 *         description: Updated to-do
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Todo successfully updated."
 */
router.patch("/update/:id", validateDto(UpdateTodoDto), updateTodo);

/**
 * @openapi
 * /todo/delete/{id}:
 *   delete:
 *     tags:
 *       - Todo
 *     summary: Delete a to-do
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("/delete/:id", deleteTodo);

export default router;
