/* eslint-disable react/prop-types */
import { PrimaryButton, TextField } from "@fluentui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../stores/tasksSlice";
import Swal from "sweetalert2";
const Form = () => {
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
        <form onSubmit={handleSubmit} className="flex-row p-5 w-1/3">
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
