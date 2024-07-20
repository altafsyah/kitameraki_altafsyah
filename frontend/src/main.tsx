import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TaskProvider } from "./context/task-context.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Setting from "./Setting.tsx";
import { FormProvider } from "./context/form-context.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-left" />
    </FormProvider>
  </TaskProvider>
);
