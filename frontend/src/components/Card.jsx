/* eslint-disable react/prop-types */
import { DefaultButton } from "@fluentui/react";
import { useState } from "react";
import DetailModal from "./DetailModal";
import EditModal from "./EditModal";

const Card = ({ data, onDelete, reff }) => {
    const { id, title, description } = data || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const handleDelete = async () => {
        try {
            onDelete(id);
        } catch (err) {
            console.error("Error deleting data", err);
        }
    };

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleEditModal = () => {
        setEditModal(!editModal);
    };

    return (
        <div ref={reff}>
            <div className="block max-w-xs max-h-40 p-6 bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100">
                <div className="cursor-pointer" onClick={handleModal}>
                    <div className="mb-2 text-lg font-bold tracking-tight text-gray-900 truncate">
                        {title}
                    </div>
                    <div className="mb-2 text-sm font-normal text-gray-700 truncate">
                        {description}
                    </div>
                </div>
                <div className="flex justify-around">
                    <DefaultButton
                        className="bg-warning hover:bg-yellow-500 text-primary"
                        text="Edit"
                        onClick={handleEditModal}
                        allowDisabledFocus
                    />
                    <DefaultButton
                        className="bg-danger hover:bg-orange-700 text-primary"
                        text="Delete"
                        onClick={handleDelete}
                        allowDisabledFocus
                    />
                </div>
            </div>
            {isModalOpen ? (
                <DetailModal
                    data={data}
                    modal={isModalOpen}
                    handleModal={handleModal}
                />
            ) : (
                ""
            )}
            {editModal ? (
                <EditModal
                    data={data}
                    editModal={editModal}
                    handleEditModal={handleEditModal}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default Card;
