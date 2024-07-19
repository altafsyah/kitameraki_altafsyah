/* eslint-disable react-hooks/exhaustive-deps */
import { Panel, TextField } from "@fluentui/react";
import { useCallback, useRef, useState } from "react";

export default function TaskForm() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dismissPanel = () => setIsPanelOpen(false);

  const openPanel = () => setIsPanelOpen(true);

  const onRenderFooterContent = useCallback(
    () => (
      <div>
        <button
          onClick={dismissPanel}
          className="w-full bg-blue-600 py-2 text-white"
        >
          Save
        </button>
        <button
          onClick={dismissPanel}
          className="w-full bg-gray-50 py-2 text-black mt-3 border border-gray-500"
        >
          Cancel
        </button>
      </div>
    ),
    [dismissPanel]
  );

  return (
    <>
      <button
        onClick={openPanel}
        className="absolute bottom-5 right-5 px-5 py-2 bg-blue-600 rounded text-white font-medium"
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
        <div ref={containerRef}>
          <TextField label="Task Name" />
          <TextField
            label="Description"
            multiline
            autoAdjustHeight
            scrollContainerRef={containerRef}
          />
        </div>
      </Panel>
    </>
  );
}
