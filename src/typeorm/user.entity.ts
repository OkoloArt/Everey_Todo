import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Todo } from "./todo.entity";

@Entity()
export class User extends Base {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
