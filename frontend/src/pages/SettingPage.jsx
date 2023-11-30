/* eslint-disable react/prop-types */
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Form from "./../components/Form";
import Navbar from "./../components/Navbar";
import Sidebar from "../components/Sidebar";

const SettingPage = () => {
    const [formData, setFormData] = useState([]);

    const onDragEnd = (data) => {
        const { draggableId, source, destination } = data;

        if (source && destination) {
            const newFormData = [...formData];

            if (source.droppableId === "controls_droppable") {
                const newFormControl = {
                    id: `${formData.length}`,
                    type: draggableId,
                    config: {},
                };
                newFormData.splice(destination.index, 0, newFormControl);
            }

            if (source.droppableId === "form_droppable") {
                const movedFormControl = newFormData.splice(source.index, 1)[0];
                newFormData.splice(destination.index, 0, movedFormControl);
            }

            setFormData(newFormData);
        }
    };

    const addControlToForm = (droppedControl) => {
        const newFormControl = {
            id: `${formData.length}`,
            type: droppedControl.value,
            config: {},
        };
        const newFormData = [...formData, newFormControl];
        setFormData(newFormData);
    };

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Navbar />
                <Droppable droppableId="main_droppable" type="main">
                    {(provided) => (
                        <div
                            className="flex"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Sidebar onDropControl={addControlToForm} />
                            <Form formData={formData} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default SettingPage;
