import { eventActionsTypes } from "../../constants/eventActionsTypes"

const initialState = {
    events: [],
    commentsEventList: [],
    users:[]
};

export const eventReducer = (state = initialState, { type, payload}) => {
switch (type) {
    case eventActionsTypes.FETCH_EVENTS:
        return { ...state, events: payload };
    case eventActionsTypes.SET_COMMENTSEVENT:
        return { ...state, commentsEventList: payload };
    case eventActionsTypes.SET_USER:
        return { ...state, users: payload };
    case eventActionsTypes.LIKE:
        return { ...state, events: state.events.map((event) => (event._id === payload._id ? payload : event)) };

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
        case eventActionsTypes.COMMENT:
            return {
                ...state,
                // events: state.events.map((event) => {
                //     if (event._id === +payload._id) {
                //         return payload;
                //     }
                //     return event;
                // }),
            };
        case eventActionsTypes.SELECTED_COMMENT:
            return { ...state, ...payload };
        default:
            return state;
    }
};

export const eventCreateReducer = (state={}, action)=>{
    switch (action.type){
        case eventActionsTypes.EVENTS_CREATE_REQUEST:
            return{loading:true};
        case eventActionsTypes.EVENTS_CREATE_SUCCESS:
            return {loading:false, success: true};
        case eventActionsTypes.EVENTS_CREATE_FAIL: 
            return{loading: false , error : action.payload};
        default:
            return state;

    }
};

export const eventUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case eventActionsTypes.EVENTS_UPDATE_REQUEST:
            return { loading: true };
        case eventActionsTypes.EVENTS_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case eventActionsTypes.EVENTS_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const commentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case eventActionsTypes.COMMENT_UPDATE_REQUEST:
            return { loading: true };
        case eventActionsTypes.COMMENT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case eventActionsTypes.COMMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const commentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case eventActionsTypes.COMMENT_DELETE_REQUEST:
            return { loading: true };
        case eventActionsTypes.COMMENT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case eventActionsTypes.COMMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const eventDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case eventActionsTypes.EVENTS_DELETE_REQUEST:
            return { loading: true };
        case eventActionsTypes.EVENTS_DELETE_SUCCESS:
            return { loading: false, success: true };
        case eventActionsTypes.EVENTS_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};

