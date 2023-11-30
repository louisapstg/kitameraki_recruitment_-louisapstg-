/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const controls = [
    {
        value: "textfield",
        label: "Input Text",
    },
    {
        value: "date",
        label: "Date Picker",
    },
    {
        value: "spinbutton",
        label: "Spin Button",
    },
];

const DraggableRepresentation = ({ control, isDragging }) => (
    <div
        style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "4px",
            backgroundColor: isDragging ? "#d3ffd3" : "white",
        }}
    >
        {control.label}
    </div>
);

const Sidebar = ({ onDropControl }) => {
    const [droppedControl, setDroppedControl] = useState(null);

    const handleDrop = (control) => {
        setDroppedControl(control);
        onDropControl(control); // Notify the parent component about the drop
    };

    return (
        <aside
            id="default-sidebar"
            className="z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 bg-gray-100"
            aria-label="Sidebar"
            style={{ height: "90vh" }}
        >
            <Droppable
                droppableId="controls_droppable"
                type="controls"
                isDropDisabled={false}
            >
                {(provided) => (
                    <div
                        className="h-full px-3 py-4 overflow-y-auto"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {controls.map((control, index) => (
                            <Draggable
                                key={`control_draggable_${control.value}`}
                                draggableId={control.value}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div
                                            onClick={() => handleDrop(control)}
                                        >
                                            <DraggableRepresentation
                                                control={control}
                                                isDragging={snapshot.isDragging}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </aside>
    );
};

export default Sidebar;
