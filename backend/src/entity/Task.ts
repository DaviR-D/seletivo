import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("tasks")
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tag: string;

  @Column()
  date: Date;

  @Column()
  duration: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
