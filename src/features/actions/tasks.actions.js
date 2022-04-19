import { ActionsTypes } from "../constants/tasks.action.types";

export const setTasks = (tasks) => {
    return {
        type: ActionsTypes.SET_TASKS,
        payload: tasks,
    };
};

export const selectedTask = (task) => {
    return {
        type: ActionsTypes.SELECTED_TASK,
        payload: task,
    };
};
