import clsx from "clsx";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <>
      <main className="relative max-w-screen-sm w-full mx-auto bg-blue-300 min-h-screen p-6 pb-24">
        <h1>Taskly</h1>
        <ul className="flex items-center gap-3 mt-5">
          <li>
            <button
              className={clsx(
                "px-3 text-white font-medium py-1 rounded bg-blue-600",
                "hover:bg-blue-600 transition-colors duration-200"
              )}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={clsx(
                "px-3 text-white font-medium py-1 rounded bg-blue-400",
                "hover:bg-blue-600 transition-colors duration-200"
              )}
            >
              To Do
            </button>
          </li>
          <li>
            <button
              className={clsx(
                "px-3 text-white font-medium py-1 rounded bg-blue-400",
                "hover:bg-blue-600 transition-colors duration-200"
              )}
            >
              Completed
            </button>
          </li>
        </ul>
        <TaskList />
        <TaskForm />
      </main>
    </>
  );
}

export default App;
