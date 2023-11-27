/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTask } from "../stores/tasksSlice";
import Swal from "sweetalert2";

const CardContainer = ({ pageNumber, setPageNumber }) => {
    const dispatch = useDispatch();

    const datas = useSelector((state) => state.task.data);
    const loading = useSelector((state) => state.task.loading);
    const error = useSelector((state) => state.task.error);
    const hasMore = useSelector((state) => state.task.hasMore);

    const observer = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchTask(pageNumber));
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [dispatch, pageNumber]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await dispatch(deleteTask(id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } catch (e) {
                    console.error("Error deleting task", e);
                }
            }
        });
    };

    const lastTaskElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore],
    );

    return (
        <div className="grid grid-cols-3 gap-4 p-5 max-h-[550px] w-2/3 overflow-y-auto">
            {datas?.map((data, index) => {
                if (datas.length === index + 1) {
                    return (
                        <Card
                            key={index}
                            reff={lastTaskElementRef}
                            data={data}
                            onDelete={handleDelete}
                        />
                    );
                } else {
                    return (
                        <Card key={index} data={data} onDelete={handleDelete} />
                    );
                }
            })}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
        </div>
    );
};

export default CardContainer;
