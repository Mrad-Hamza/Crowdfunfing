import { eventActionsTypes } from "../constants/eventActionsTypes";
import axios from "axios";
import {useParams} from "react-router-dom"

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


export const selectedComment = (task) => {
    return {
        type: eventActionsTypes.SELECTED_COMMENT,
        payload: task,
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

        const { data } = await axios.delete(`http://localhost:5000/events/delete/${id}`, config);

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

export const updateEventAction = (id,nameEvent, startDateEvent, endDateEvent, descriptionEvent, urlEvent, location) => async (dispatch, getState) => {
    try {
        dispatch({
            type: eventActionsTypes.EVENTS_UPDATE_REQUEST,
        });

        // const {
        //     userLogin: { userInfo },
        // } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`http://localhost:5000/events/update/${id}`, { nameEvent, startDateEvent, endDateEvent, descriptionEvent, urlEvent, location }, config);

        dispatch({
            type: eventActionsTypes.EVENTS_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: eventActionsTypes.EVENTS_UPDATE_FAIL,
            payload: message,
        });
    }
};
export const getEventsByFilter = (arg) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:5000/events/search", arg);

        dispatch({
            type: eventActionsTypes.FETCH_EVENTS,
            payload: response.data.events,
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        console.log("getEventsByFilter api error: ", error);
        dispatch({
            type: eventActionsTypes.ERROR,
            payload: message,
        });
    }
};


export const commentEvent = (value ,id) => async (dispatch) => {
    try {
        console.log(id);
        const data = await axios.post(`http://localhost:5000/events/commentEvent/${id}/`, value); 
        console.log(data);
        dispatch({ type: eventActionsTypes.COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};

export const setCommentsEvent = (commentEvent) => {
    return {
        type: eventActionsTypes.SET_COMMENTSEVENT,
        payload: commentEvent,
    };
};

export const deleteCommentAction = (_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: eventActionsTypes.COMMENT_DELETE_REQUEST,
        });

        // const {
        //     userLogin: { userInfo },
        // } = getState();

        const config = {
            headers: {
                //Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`http://localhost:5000/commentEvent/delete/${_id}`, config);

        dispatch({
            type: eventActionsTypes.COMMENT_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: eventActionsTypes.COMMENT_DELETE_FAIL,
            payload: message,
        });
    }
};


export const updateCommentAction = (id, comment) => async (dispatch, getState) => {
    try {
        dispatch({
            type: eventActionsTypes.COMMENT_UPDATE_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`http://localhost:5000/commentEvent/update/${id}`, { comment }, config);

        dispatch({
            type: eventActionsTypes.COMMENT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: eventActionsTypes.COMMENT_UPDATE_FAIL,
            payload: message,
        });
    }
};

export const likeEvent = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("currentUsername"));
    try {
        const { data } = await axios.patch(`http://localhost:5000/events/${id}/likeEvent`, );

        dispatch({ type: eventActionsTypes.LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

