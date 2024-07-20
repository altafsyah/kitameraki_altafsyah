import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFormContext } from "./context/form-context";
import { toast } from "react-toastify";

export default function Setting() {
  const [sidebarItems, setSidebarItems] = useState([
    { id: "textField", content: "Text Field" },
    { id: "dateField", content: "Date Field" },
    { id: "spinButton", content: "Spin Button" },
  ]);
  const [mainItems, setMainItems] = useState([]);
  const { handleFieldsAddition } = useFormContext();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      if (
        source.droppableId === "optional" &&
        destination.droppableId === "main"
      ) {
        const draggedItem = sidebarItems[source.index];

        const newItem = {
          id: `${draggedItem.id}-copy-${mainItems.length}`,
          content: {
            name: "Field Name",
            type: draggedItem.content,
          },
        };

        setMainItems((prev) => [...prev, newItem]);
      }
    }
  };

  const handleSaveFormFields = () => {
    console.log("Halo");

    const res = handleFieldsAddition(mainItems););

    if (res) {
      toast.success("Success");
    } else {
      toast.error("Failed top Save Fields");
      setMainItems([]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex">
        <aside className="p-5 bg-blue-400 h-screen">
          <h1>Optional Fields</h1>
          <div className="mt-5">
            <Droppable droppableId="optional">
              {(provided) => (
                <div
                  key="optional"
                  className="w-fit"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {sidebarItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="p-10 bg-white"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </aside>
        <section className="w-full min-h-screen p-10">
          <h2>Mandatory Field</h2>
          <div className="mt-3">
            <h2>Task Name</h2>
            <div className="w-full p-5 bg-white"></div>
          </div>
          <div className="mt-3">
            <h2>Task Description</h2>
            <div className="w-full p-5 bg-white"></div>
          </div>
          <h2 className="mt-5">Optional Fields</h2>
          <Droppable droppableId="main">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="h-fit grid grid-cols-2 gap-5"
              >
                {mainItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full mt-4 h-fit"
                        style={{
                          ...provided.draggableProps.style,
                          userSelect: "none",
                        }}
                      >
                        <h2>{item.content.type}</h2>
                        <input
                          className="p-3 w-full mt-2"
                          value={item.content.name}
                          onChange={(e) => {
                            const newFields = [...mainItems];
                            newFields[index].content.name =
                              e.currentTarget.value;
                            setMainItems(newFields);
                          }}
                        ></input>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            onClick={handleSaveFormFields}
            className="fixed right-10 bottom-10 px-3 py-2 w-fit rounded bg-blue-600 text-white hover:bg-blue-400 transition-colors duration-200"
          >
            Save
          </button>
        </section>
      </main>
    </DragDropContext>
  );
}
