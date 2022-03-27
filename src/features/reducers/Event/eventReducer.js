import { eventActionsTypes } from "../../constants/eventActionsTypes"

const initialState = {
    events: [],
};

export const eventReducer = (state = initialState, { type, payload}) => {
switch (type) {
    case eventActionsTypes.FETCH_EVENTS:
        return { ...state, events: payload };
    default:
        return state;
}
};


export const selectedEventReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case eventActionsTypes.SELECTED_EVENT:
            return { ...state, ...payload };
        case eventActionsTypes.REMOVE_SELECTED_EVENT:
            return {};
        default:
            return state;
    }
};