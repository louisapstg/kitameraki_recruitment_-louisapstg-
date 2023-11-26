import { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTask } from "../stores/tasksSlice";

const CardContainer = () => {
    const dispatch = useDispatch();
    const datas = useSelector((state) => state.task.data);
    //  const loading = useSelector((state) => state.task.loading);

    useEffect(() => {
        dispatch(fetchTask());
    }, [dispatch]);

    const handleDelete = async (id) => {
        await dispatch(deleteTask(id));
        dispatch(fetchTask());
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-5 w-2/3 max-h-[625px] overflow-y-auto">
            {datas?.map((data, id) => {
                return <Card key={id} data={data} onDelete={handleDelete} />;
            })}
        </div>
    );
};

export default CardContainer;
