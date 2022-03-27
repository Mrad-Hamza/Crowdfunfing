import {combineReducers} from 'redux';
import { eventReducer, selectedEventReducer} from "./eventReducer";

const reducers = combineReducers({
    allEvents : eventReducer,
    event: selectedEventReducer
});


export default reducers;