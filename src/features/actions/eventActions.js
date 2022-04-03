import { eventActionsTypes } from "../constants/eventActionsTypes";
export const setEvents = (events) =>{
    return {
        type: eventActionsTypes.FETCH_EVENTS,
        payload:events,
    };
}

export const selectedEvent = (event) => {
    return {
        type: eventActionsTypes.SELECTED_EVENT, 
        payload: event,
    };
}

export const RemoveSelectedEvent = () => {
    return {
        type: eventActionsTypes.REMOVE_SELECTED_EVENT,
    };
};