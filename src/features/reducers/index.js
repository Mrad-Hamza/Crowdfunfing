import { combineReducers } from "redux";
import { projectReducer, selectedProjectReducer } from "./projects.reducers";

const reducers = combineReducers({
    projects: projectReducer,
    project: selectedProjectReducer,
});

export default reducers;
