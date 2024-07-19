import TaskItem from "./TaskItem";

export default function TaskList() {
  return (
    <ul className="mt-6">
      <TaskItem
        name="Create New Tasks"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, excepturi?"
      />
    </ul>
  );
}
