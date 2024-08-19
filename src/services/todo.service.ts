import { Repository } from "typeorm";
import {
  CreateTodoDto,
  TodoResponseDto,
  UpdateTodoDto,
} from "../dtos/todo.dto";
import { Todo } from "../typeorm/todo.entity";
import { User } from "../typeorm/user.entity";
import { dataSource } from "../configs/configDB";
import { UserService } from "./user.service";
import { toToDoResponseDto } from "../utils/mapper.utils";

export class TodoService {
  private todoRepository: Repository<Todo>;
  private readonly userRepo: Repository<User>;

  constructor() {
    this.todoRepository = dataSource.getRepository(Todo);
    this.userRepo = dataSource.getRepository(User);
  }

  async create(userId: string, data: CreateTodoDto): Promise<Result<void>> {
    try {
      const user = await this.userRepo.findOneBy({ id: userId });

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.todos) {
        user.todos = [];
      }

      const todo = this.todoRepository.create(data);
      user.todos.push(todo);

      await this.todoRepository.save(todo);
      await this.userRepo.save(user);

      return {
        status: 201,
        message: "Todo successfully added.",
      };
    } catch (error) {
      return {
        status: 500,
        message: "An error occurred while creating a Todo.",
      };
    }
  }

  async update(id: string, data: UpdateTodoDto): Promise<Result<void>> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new Error("Todo not found");
    }

    Object.assign(todo, data);
    await this.todoRepository.save(todo);
    return {
      status: 200,
      message: `Congrats, you've updated Todo with id: ${todo.id}.`,
    };
  }

  async delete(id: string): Promise<Result<void>> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new Error("Todo not found");
    }
    await this.todoRepository.remove(todo);
    return {
      status: 200,
      message: "Todo was deleted successfully.",
    };
  }

  async getTodos(userId: string): Promise<Result<TodoResponseDto[]>> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const todos = await this.todoRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });

    const response = todos.map((todo) => toToDoResponseDto(todo));

    return {
      data: response,
    };
  }
}
