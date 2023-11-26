import { useEffect, useState } from "react";
import Card from "./Card";
import TasksAPI from "./../apis/tasks.api";

const CardContainer = () => {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        try {
            TasksAPI.getData().then((results) => {
                setDatas(results.payload);
            });
        } catch (err) {
            console.error(err);
        }
    }, [datas]);

    const handleDelete = (id) => {
        const updatedDatas = datas.items?.filter((data) => data.id !== id);
        setDatas(updatedDatas);
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-5 w-2/3 max-h-[625px] overflow-y-auto">
            {datas.items?.map((data) => {
                return (
                    <Card key={data.id} data={data} onDelete={handleDelete} />
                );
            })}
        </div>
    );
};

export default CardContainer;
