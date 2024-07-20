import { TaskItemProps } from "../components/TaskItem";

const API_URL = "http://localhost:8080";

async function getTasks(): Promise<TaskItemProps[]> {
  try {
    const tasks: TaskItemProps[] = [];
    const res = await fetch(`${API_URL}/tasks`).then(
      async (data) => (await data.json()) as Promise<[]>
    );
    console.log(res);

    if (res.length > 0) {
      res.forEach((task) =>
        tasks.push({
          id: task["id"],
          name: task["name"],
          description: task["description"],
          isComplete: task["description"],
        })
      );
      return tasks;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function createTask(task: FormData): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify({
        name: task.get("name"),
        description: task.get("description"),
      }),
    });
    if (res.ok) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

async function deleteTask(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // If the response is not OK, throw an error
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // If we reach here, the delete was successful
    console.log(`Task ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
}

async function updateTask(task: TaskItemProps): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...task,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating task:", error);
    return false;
  }
}

export { getTasks, createTask, deleteTask, updateTask };
