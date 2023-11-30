/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    DatePicker,
    PrimaryButton,
    SpinButton,
    TextField,
} from "@fluentui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../stores/tasksSlice";
import Swal from "sweetalert2";
import { Droppable } from "react-beautiful-dnd";

const Form = ({ formData, innerRef, droppableProps }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createTask({ title, description }));
            Swal.fire({
                position: "bottom-end",
                icon: "success",
                showConfirmButton: false,
                timer: 1300,
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            });
        } catch (e) {
            console.error("Error posting data", e.message);
        }
    };

    return (
        <form
            // ref={innerRef}
            // {...droppableProps}
            onSubmit={handleSubmit}
            className="flex-row p-5 w-1/3"
        >
            <TextField
                id="title"
                name="title"
                className="my-2"
                label="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                id="description"
                name="description"
                className="my-2"
                label="Description"
                multiline
                autoAdjustHeight
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {/* <Droppable droppableId="form_droppable">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="h-36"
                    >
                        {formData.map((control) => (
                            <div key={control.id}>
                                {control.type === "textfield" && (
                                    <TextField label="Input Text" />
                                )}
                                {control.type === "date" && (
                                    <DatePicker label="Date Picker" />
                                )}
                                {control.type === "spinbutton" && (
                                    <SpinButton
                                        label="Spin Button"
                                        defaultValue="0"
                                        min={0}
                                        max={100}
                                        step={1}
                                        incrementButtonAriaLabel="Increase value by 1"
                                        decrementButtonAriaLabel="Decrease value by 1"
                                    />
                                )}
                            </div>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable> */}
            <PrimaryButton
                type="submit"
                className="my-2 bg-secondary hover:bg-primary float-right"
                text="Submit"
                allowDisabledFocus
            />
        </form>
    );
};

export default Form;
