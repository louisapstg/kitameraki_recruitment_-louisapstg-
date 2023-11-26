/* eslint-disable react/prop-types */
import { DefaultButton } from "@fluentui/react";
import { useState } from "react";
import DetailModal from "./DetailModal";

const Card = ({ data, onDelete }) => {
    const { id, title, description } = data || {};
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <div>
            <div className="block max-w-xs max-h-40 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <div className="cursor-pointer" onClick={handleModal}>
                    <div className="mb-2 text-lg font-bold tracking-tight text-gray-900">
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
        </div>
    );
};

export default Card;
