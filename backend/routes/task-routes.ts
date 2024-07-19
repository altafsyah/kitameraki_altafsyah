import { IncomingMessage, ServerResponse } from "http";
import * as url from "url";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task-controller";
import { notFound } from "../helper";

export default async function handleTaskRoutes(
  req: IncomingMessage,
  res: ServerResponse
) {
  const parsedURL = url.parse(req.url!);
  const path = parsedURL.pathname;
  const trimmedPath = path!.replace(/^\/+|\/+$/g, "");
  const method = req.method;



  if (trimmedPath === "tasks") {
    if (method === "GET") {
      getTasks(req, res);
    } else if (method === "POST") {
      createTask(req, res);
    } else {
      notFound(res, "Not Found");
    }
  } else if (trimmedPath.startsWith("tasks/")) {
    const id = parseInt(trimmedPath.split("/")[1]);
    if (req.method === "GET") {
      getTaskById(req, res, id);
    } else if (req.method === "PUT") {
      await updateTask(req, res, id);
    } else if (req.method === "DELETE") {
      console.log("Keren");
      deleteTask(res, id);
    }
  }
}
