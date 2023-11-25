import { useEffect, useState } from "react";
import Card from "./Card";
import TasksAPI from "../../../backend/src/apis/tasks.api";

const CardContainer = () => {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        TasksAPI.getData().then((results) => {
            setDatas(results.payload);
        });
    }, [datas]);
    return (
        <div className="grid grid-cols-3 gap-4 p-5 w-2/3 max-h-[625px] overflow-y-auto">
            {datas.items?.map((data) => {
                return <Card key={data.id} data={data} />;
            })}
        </div>
    );
};

export default CardContainer;
