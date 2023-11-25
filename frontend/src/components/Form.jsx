/* eslint-disable no-unused-vars */
import { PrimaryButton, TextField } from "@fluentui/react";
import { useState } from "react";
import TasksAPI from "../apis/tasks.api";
const Form = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await TasksAPI.postData({ title, description });
            console.log("data posted", result);
            setTitle("");
            setDescription("");
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
