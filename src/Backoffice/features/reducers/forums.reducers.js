import { ForumActionsTypes } from "../../constants/forumsActionsTypes"
const initialState = {
    forums: [],
};
export const forumsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ForumActionsTypes.SET_FORUMS:
            return { ...state, forums: payload };

        default:
            return state;
    }
};

export const selectedForumsReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ForumActionsTypes.SELECTED_FORUMS:
            return { ...state, ...payload };
            case ForumActionsTypes.REMOVE_SELECTED_FORUM:
                return {};
        default:
            return state;
    }
};
