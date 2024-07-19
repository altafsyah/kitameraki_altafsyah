type TaskItemProps = {
  name: string;
  description?: string;
  isComplete?: boolean;
};

export default function TaskItem(props: TaskItemProps) {
  return (
    <li className="bg-white p-3 rounded shadow flex gap-4 justify-between items-center">
      <div className="w-fit">
        <h2 className="text-lg font-medium">{props.name}</h2>
        {props.description && (
          <p className="text-sm text-gray-500">{props.description}</p>
        )}
      </div>
      <div className="w-fit">
        <button className="block w-full bg-blue-400 p-1 rounded">Edit</button>
        <button className="block w-full bg-red-500 p-1 rounded mt-2">
          Delete
        </button>
      </div>
    </li>
  );
}
