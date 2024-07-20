import { FormEvent, useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useTaskContext } from "../context/task-context";

export type TaskItemProps = {
  id: number;
  name: string;
  description?: string;
  isComplete?: boolean;
};

export default function TaskItem(props: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<TaskItemProps>({
    id: props.id,
    name: props.name,
    description: props.description,
    isComplete: props.isComplete,
  });

  const { delTask, editTask } = useTaskContext();

  const handleUpdate = async () => {
    try {
      const res = await editTask(task);
      if (res) {
        toast.info("Success Updating Task!");
      } else {
        throw new Error("Server Error");
      }
      setIsEditing(false);
    } catch (error) {
      toast.error("Updating Task Failed");
      setTask({ ...props });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await delTask(props.id);
      if (res) {
        toast.info("Success Deleting Task!");
      } else {
        toast.error("Deleting Task Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Deleting Task Failed");
    }
  };

  const handleTaskChange = (event: FormEvent<HTMLInputElement>) => {
    if (event && event.currentTarget) {
      const { name, value } = event.currentTarget;

      setTask((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      console.error("Event or currentTarget is undefined", event);
    }
  };

  return (
    <>
      <div className="w-fit">
        <input
          disabled={!isEditing}
          name="name"
          onChange={handleTaskChange}
          className={clsx(
            "bg-transparent text-lg font-medium transition-all duration-200 rounded",
            isEditing
              ? "border border-gray-300 outline-none p-2"
              : "border-none outline-none p-0"
          )}
          value={task.name}
        ></input>
        {props.description && (
          <input
            disabled={!isEditing}
            name="description"
            onChange={handleTaskChange}
            className={clsx(
              "bg-transparent text-sm block transition-all duration-200 rounded",
              isEditing
                ? "border border-gray-300 outline-none p-2 mt-2"
                : "border-none outline-none p-0"
            )}
            value={task.description}
          />
        )}
      </div>
      <div className="w-fit">
        <button
          className="block w-full bg-blue-400 p-1 rounded"
          onClick={() => {
            if (!isEditing) {
              setIsEditing(!isEditing);
            } else {
              handleUpdate();
            }
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button
            className="block w-full bg-gray-400 p-1 rounded mt-2"
            onClick={() => {
              setTask({ ...props });
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
        <button
          className="block w-full bg-red-500 p-1 rounded mt-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
}
