import { TaskController } from "./controller/TaskController";

export const Routes = [
  {
    method: "get",
    route: "/tasks",
    controller: TaskController,
    action: "all",
  },
  {
    method: "post",
    route: "/tasks",
    controller: TaskController,
    action: "save",
  },
  {
    method: "delete",
    route: "/tasks/:id",
    controller: TaskController,
    action: "remove",
  },
  {
    method: "patch",
    route: "/tasks/:id",
    controller: TaskController,
    action: "update",
  },
];
