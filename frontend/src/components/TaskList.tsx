import { useEffect, useState } from "react";
import TaskItem, { TaskItemProps } from "./TaskItem";
import { getTasks } from "../utils/api";

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);

  async function fetchTasks() {
    const res = await getTasks();
    setTasks(res);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(tasks);

  return (
    <ul className="mt-6">
      {tasks.length > 0 &&
        tasks.map((task) => (
          <TaskItem
            id={task.id}
            key={task.id}
            name={task.name}
            description={task.description}
            isComplete={task.isComplete}
          />
        ))}
    </ul>
  );
}
