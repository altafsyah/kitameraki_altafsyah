// import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
// import { getTasks } from "../utils/api";
import { useTaskContext } from "../context/task-context";
import { useCallback, useRef, useState } from "react";

export default function TaskList() {
  const { tasks, page, incPage, hasMore, loading } = useTaskContext();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastTaskRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          incPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <ul className="mt-6">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <li
            ref={index === tasks.length - 1 ? lastTaskRef : null}
            key={task.id}
            className="bg-white p-3 rounded shadow flex gap-4 justify-between items-center mt-3"
          >
            <TaskItem
              id={task.id}
              name={task.name}
              description={task.description}
              isComplete={task.isComplete}
            />
          </li>
        ))
      ) : (
        <div className="w-full text-center bg-blue-100 p-5 rounded">
          <h2>No Task for Today</h2>
        </div>
      )}
      {loading && (
        <h1 className="text-white text-center text-xl">Loading...</h1>
      )}
    </ul>
  );
}
