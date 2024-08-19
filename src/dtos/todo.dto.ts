import { IsString, IsBoolean, IsOptional, IsUUID } from "class-validator";

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

export class TodoResponseDto {
  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  @IsUUID()
  todoId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  isCompleted: boolean;
}
