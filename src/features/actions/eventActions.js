import { eventActionsTypes } from "../constants/eventActionsTypes";
import axios from "axios";
import URL from "../../features/constants/service.constants";

export const setEvents = (events) => {
    return {
        type: eventActionsTypes.FETCH_EVENTS,
        payload: events,
    };
};

export const selectedEvent = (event) => {
    return {
        type: eventActionsTypes.SELECTED_EVENT,
        payload: event,
    };
};

export const RemoveSelectedEvent = () => {
    return {
        type: eventActionsTypes.REMOVE_SELECTED_EVENT,
    };
};

export const createEventAction = (nameEvent, startDateEvent, endDateEvent, descriptionEvent, urlEvent, location) => async (dispatch, getState) => {
    try {
        dispatch({
            type: eventActionsTypes.EVENTS_CREATE_REQUEST,
        });

        // const {
        //     userLogin: { userInfo },
        // } = getState();

        const config = {
            headers: {
                method: "POST",
                "Content-Type": "application/json",
                //Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const data = await axios.post("http://localhost:5000/events/createEvent", { nameEvent, startDateEvent, endDateEvent, descriptionEvent,location,urlEvent },config);
        console.log(data);
        dispatch({
            type: eventActionsTypes.EVENTS_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: eventActionsTypes.EVENTS_CREATE_FAIL,
            payload: message,
        });
    }
};

export const deleteEventAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: eventActionsTypes.EVENTS_DELETE_REQUEST,
        });

        // const {
        //     userLogin: { userInfo },
        // } = getState();

        const config = {
            headers: {
                //Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`http://localhost:5000/events/${id}`, config);

        dispatch({
            type: eventActionsTypes.EVENTS_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: eventActionsTypes.EVENTS_DELETE_FAIL,
            payload: message,
        });
    }
};
