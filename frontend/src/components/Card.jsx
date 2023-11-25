/* eslint-disable react/prop-types */
import { DefaultButton } from "@fluentui/react";

const Card = ({ data }) => {
    const { title, description } = data;
    return (
        <div className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
            <div className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                {title}
            </div>
            <div className="mb-2 text-sm font-normal text-gray-700 truncate">
                {description}
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
                    allowDisabledFocus
                />
            </div>
        </div>
    );
};

export default Card;
