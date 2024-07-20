/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TaskItemProps } from "../components/TaskItem";
import { createTask, getTasks, deleteTask, updateTask } from "../utils/api";

interface TaskContextType {
  tasks: TaskItemProps[];
  fetchTasks: () => Promise<void>;
  page: number;
  incPage: () => void;
  hasMore: boolean;
  loading: boolean;
  addTask: (data: FormData) => Promise<boolean>;
  delTask: (id: number) => Promise<boolean>;
  editTask: (task: TaskItemProps) => Promise<boolean>;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  fetchTasks: async () => {},
  page: 1,
  incPage: () => {},
  hasMore: false,
  loading: false,
  addTask: async () => false,
  delTask: async () => false,
  editTask: async () => false,
});

export const useTaskContext = () => useContext(TaskContext);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const incPage = () => setPage((prev) => prev + 1);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks(page);
      setTasks((prev) => [...prev, ...res.tasks]);
      setHasMore(page < res.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks((prev) => [...prev]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (data: FormData) => {
    try {
      const res = await createTask(data);
      if (res) {
        setTasks((prev) => [
          ...prev,
          {
            ...res,
          },
        ]);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const delTask = async (id: number) => {
    try {
      const index = tasks.findIndex((task) => task.id === id);
      const res = await deleteTask(id);
      if (res) {
        const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
        setTasks([...newTasks]);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const editTask = async (task: TaskItemProps) => {
    try {
      const res = await updateTask(task);
      if (res) {
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const value = {
    tasks,
    fetchTasks,
    page,
    incPage,
    hasMore,
    loading,
    addTask,
    delTask,
    editTask,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
