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