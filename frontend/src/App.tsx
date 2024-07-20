import clsx from "clsx";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <main className="relative max-w-screen-sm w-full mx-auto bg-blue-300 min-h-screen p-6 pb-24">
        <h1 className="text-center text-white text-3xl font-medium">Taskly</h1>
        <TaskList />
        <TaskForm />
        <ToastContainer position="bottom-left" />
      </main>
    </>
  );
}

export default App;
