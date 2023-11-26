import { PrimaryButton, TextField } from "@fluentui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, fetchTask } from "../stores/tasksSlice";

/* eslint-disable react/prop-types */
const EditModal = ({ data, editModal, handleEditModal }) => {
    const {
        id,
        title: initialTitle,
        description: initialDescription,
    } = data || {};
    const dispatch = useDispatch();
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    const handleTitleChange = (event) => {
        setTitle(event.target.value || "");
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value || "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title === initialTitle)
            return alert("The title has not been changed");
        if (description === initialDescription)
            return alert("The description has been changed");
        try {
            await dispatch(editTask({ id, newData: { title, description } }));
            handleEditModal();
            dispatch(fetchTask());
        } catch (e) {
            console.error("Error editing data", e);
        }
    };

    return (
        <div
            id="crud-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={`${
                editModal
                    ? "flex items-center justify-center fixed top-0 right-0 bottom-0 left-0"
                    : "hidden"
            } overflow-y-auto overflow-x-hidden z-50`}
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-gray-300 rounded-lg shadow-2xl">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Edit Task
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-toggle="crud-modal"
                            onClick={handleEditModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <TextField
                                    id="title"
                                    name="title"
                                    className="my-2"
                                    label="Title"
                                    required
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <TextField
                                    id="description"
                                    name="description"
                                    className="my-2"
                                    label="Description"
                                    multiline
                                    autoAdjustHeight
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </div>
                        </div>
                        <PrimaryButton
                            type="submit"
                            className="my-2 text-black bg-warning hover:bg-yellow-500"
                            text="Submit"
                            allowDisabledFocus
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
