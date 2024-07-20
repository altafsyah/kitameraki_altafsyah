import clsx from "clsx";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <main className="relative max-w-screen-sm w-full mx-auto bg-blue-300 min-h-screen p-6 pb-24">
        <div className="flex justify-between items-center">
          <h1 className=" text-white text-3xl font-medium">Taskly</h1>
          <Link
            to="/setting"
            className="px-3 py-1 bg-blue-600 rounded text-white"
          >
            Setting
          </Link>
        </div>
        <TaskList />
        <TaskForm />
      </main>
    </>
  );
}

export default App;
