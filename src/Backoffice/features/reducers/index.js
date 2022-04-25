import { combineReducers } from "redux";
import { projectReducer, selectedProjectReducer } from "./projects.reducers";
import { eventReducer, selectedEventReducer } from "../reducers/Event/eventReducer";

const reducers = combineReducers({
    projects: projectReducer,
    project: selectedProjectReducer,
    allEvents: eventReducer,
    event: selectedEventReducer,
});

export default reducers;
