import { ForumActionsTypes } from "../constants/forumsActionsTypes"
export const setforums= (forums) =>{
    return {
        type: ForumActionsTypes.FETCH_FORUMS,
        payload:forums,
    };
}

export const selectedForums = (forums) => {
    return {
        type: ForumActionsTypes.SELECTED_FORUMS, 
        payload: forums,
    };
}

export const RemoveSelectedForums = () => {
    return {
        type: ForumActionsTypes.REMOVE_SELECTED_FORUM,
    };
};