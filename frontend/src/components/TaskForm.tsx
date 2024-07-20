/* eslint-disable react-hooks/exhaustive-deps */
import { Panel, TextField } from "@fluentui/react";
import { FormEvent, useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useTaskContext } from "../context/task-context";

export default function TaskForm() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { addTask } = useTaskContext();

  const dismissPanel = () => setIsPanelOpen(false);

  const openPanel = () => setIsPanelOpen(true);

  const onRenderFooterContent = useCallback(
    () => (
      <div>
        <button
          type="button"
          onClick={() => formRef.current?.requestSubmit()}
          className="w-full bg-blue-600 py-2 text-white"
        >
          Save
        </button>
        <button
          type="button"
          onClick={dismissPanel}
          className="w-full bg-gray-50 py-2 text-black mt-3 border border-gray-500"
        >
          Cancel
        </button>
      </div>
    ),
    [dismissPanel]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await addTask(new FormData(event.currentTarget));
      if (res) {
        toast.info("Success");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed Creating Task");
    } finally {
      dismissPanel();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="fixed bottom-5 right-5 px-5 py-2 bg-blue-600 rounded text-white font-medium"
      >
        Add New Task
      </button>

      <Panel
        headerText="Add New Task"
        isOpen={isPanelOpen}
        closeButtonAriaLabel="Close"
        onDismiss={dismissPanel}
        isFooterAtBottom={true}
        onRenderFooterContent={onRenderFooterContent}
      >
        <form ref={formRef} onSubmit={handleSubmit}>
          <div ref={containerRef}>
            <TextField label="Task Name" name="name" required />
            <TextField
              name="description"
              label="Description"
              multiline
              autoAdjustHeight
              scrollContainerRef={containerRef}
            />
          </div>
        </form>
      </Panel>
    </>
  );
}
