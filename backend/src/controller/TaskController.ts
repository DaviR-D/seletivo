import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Task } from "../entity/Task";

export class TaskController {
  private taskRepository = AppDataSource.getRepository(Task);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.taskRepository.find();
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { title, description, tag, date, duration } = request.body;

    const task = Object.assign(new Task(), {
      title,
      description,
      tag,
      date,
      duration,
    });

    return this.taskRepository.save(task);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    let taskToRemove = await this.taskRepository.findOneBy({ id });

    if (!taskToRemove) {
      return "this task not exist";
    }

    await this.taskRepository.remove(taskToRemove);

    return "task has been removed";
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const task = request.body;

    await this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set(task)
      .where("id = :id", { id: id })
      .execute();

    return "Atualizado com sucesso!";
  }
}
