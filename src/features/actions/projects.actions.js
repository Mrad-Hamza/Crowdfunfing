//import { action } from "typesafe-actions";
import { ActionsTypes } from "../constants/projects.action.types";

export const selectedCompaign = (compaign) => {
    return {
        type: ActionsTypes.SELECTED_COMPAIGN,
        payload: compaign,
    };
};
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

export const setInvoiceProjects = (invoiveProjects) => {
    return {
        type: ActionsTypes.SET_INVOICEPROJECTS,
        payload: invoiveProjects,
    };
};

export const selectedInvoiceProject = (invoiceProject) => {
    return {
        type: ActionsTypes.SELECTED_INVOICEPROJECT,
        payload: invoiceProject,
    };
};

export const setComplaintProjects = (complaintProjects) => {
    return {
        type: ActionsTypes.SET_COMPLAINTPROJECTS,
        payload: complaintProjects,
    };
};

export const selectedComplaintProject = (complaintProject) => {
    return {
        type: ActionsTypes.SELECTED_COMPLAINTPROJECT,
        payload: complaintProject,
    };
};

//export const fetchProjects = () => action(ActionTypes.FETCH_PROJECTS.request);
