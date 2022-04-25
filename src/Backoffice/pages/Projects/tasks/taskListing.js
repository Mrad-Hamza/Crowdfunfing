import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskComponent from "./taskComponent";
// import { setTasks } from "../../features/actions/tasks.actions";
import URL from "../../../features/constants/services.constants";
import axios from "axios";

const TaskListing = () => {
    const tasks = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchTasks = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.tasks.fetchTasks).catch((err) => {
            console.log("Err", err);
        });
        console.log("🚀 ~ file: taskListing.js ~ line 17 ~ fetchTasks ~ result", result);
        // dispatch(setTasks(result.data));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    console.log("Tasks:", tasks);

    return (
        <div>
            <TaskComponent />
        </div>
    );
};

export default TaskListing;
