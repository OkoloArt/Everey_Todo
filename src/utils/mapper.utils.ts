import { TodoResponseDto } from "../dtos/todo.dto";
import { Todo } from "../typeorm/todo.entity";

export const toToDoResponseDto = (todo: Todo): TodoResponseDto => {
  return {
    userId: todo.user.id,
    todoId: todo.id,
    title: todo.title,
    description: todo.description,
    isCompleted: todo.isCompleted,
  };
};
