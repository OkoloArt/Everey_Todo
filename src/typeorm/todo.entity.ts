import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Todo extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
