//import { action } from "typesafe-actions";
import { ActionsTypes } from "../constants/projects.action.types";

export const setProjects = (projects) => {
    return {
        type: ActionsTypes.SET_PROJECTS,
        payload: projects,
    };
};

export const selectedProject = (project) => {
    return {
        type: ActionsTypes.SELECTED_PROJECT,
        payload: project,
    };
};

//export const fetchProjects = () => action(ActionTypes.FETCH_PROJECTS.request);