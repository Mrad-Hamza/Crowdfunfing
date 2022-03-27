import { ActionsTypes } from "../constants/projects.action.types";
const initialState = {
    projects: [],
};
export const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SET_PROJECTS:
            return { ...state, projects: payload };

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
