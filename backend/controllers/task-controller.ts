import { IncomingMessage, ServerResponse } from "http";
import { Task, TTask } from "../task";
import { json, notFound, parseBody } from "../helper";
import { parse } from "path";

function getTasks(req: IncomingMessage, res: ServerResponse) {
  try {
    const tasks = Task.getAll();
    json(res, 200, tasks);
  } catch (error) {
    json(res, 500, error);
  }
}

function getTaskById(req: IncomingMessage, res: ServerResponse, id: number) {
  try {
    const task = Task.getById(id);
    if (task) {
      json(res, 200, {
        data: task,
      });
    } else {
      json(res, 200, {
        message: "Not Found",
      });
    }
  } catch (error) {
    json(res, 500, error);
  }
}

async function createTask(req: IncomingMessage, res: ServerResponse) {
  try {
    const task = (await parseBody(req)) as any;
    const newTask = Task.create({
      name: task["name"],
      description: task["description"] ?? null,
      isComplete: false,
    } as TTask);
    if (newTask) {
      json(res, 200, { data: newTask });
    } else {
      json(res, 400, {
        msg: "Error",
      });
    }
  } catch (error) {
    json(res, 500, { msg: error });
  }
}

function deleteTask(res: ServerResponse, id: number) {
  try {
    const deletedTask = Task.delete(id);
    if (deletedTask) {
      json(res, 201, {
        message: "Success",
      });
    } else {
      notFound(res, "Not Found");
    }
  } catch (error) {
    json(res, 500, {
      message: "Error on Server",
    });
  }
}

async function updateTask(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const data = (await parseBody(req)) as any;
    const updatedTask = Task.update(id, {
      ...data,
    } as TTask);
    if (updatedTask) {
      json(res, 201, {
        message: "Success",
      });
    } else {
      notFound(res, "Not Found");
    }
  } catch (error) {
    json(res, 500, {
      message: "Error on Server",
    });
  }
}

export { getTasks, getTaskById, createTask, deleteTask, updateTask };