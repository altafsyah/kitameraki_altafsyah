export type TTask = {
  id: number;
  name: string;
  description?: string;
  isComplete?: boolean;
};

let tasks: TTask[] = [];

let id: number = 1;

export const Task = {
  create: (task: TTask) => {
    const newTask = { ...task, id: id++ };
    tasks.push(newTask);
    return newTask;
  },

  update: (id: number, data: TTask) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== 1) {
      tasks[index] = { ...tasks[index], ...data };
      return tasks;
    }
    return null;
  },

  delete: (id: number) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      return tasks.splice(index, 1)[0];
    }
    return null;
  },

  getAll: () => {
    return [...tasks];
  },

  getById: (id: number) => {
    return tasks.find((task) => task.id === id);
  },
};
