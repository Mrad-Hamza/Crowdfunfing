import { ActionsTypes } from "../constants/projects.action.types";
const initialState = {
    projects: [],
    tasksList: [],
    invoiceProjectList: [],
    complaintProjectList: [],
};
export const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SET_PROJECTS:
            return { ...state, projects: payload };
        case ActionsTypes.SET_TASKS:
            return { ...state, tasksList: payload };
        case ActionsTypes.SET_INVOICEPROJECTS:
            return { ...state, invoiceProjectList: payload };
        case ActionsTypes.SET_COMPLAINTPROJECTS:
            return { ...state, complaintProjectList: payload };
        default:
            return state;
    }
};

export const selectedProjectReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SELECTED_PROJECT:
            return { ...state, ...payload };

        default:
            return state;
    }
};
