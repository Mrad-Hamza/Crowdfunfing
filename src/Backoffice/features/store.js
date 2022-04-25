import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


// import reducers from "./reducers/Event";
// const store = createStore(reducers, {}, 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ); 

// export default store ; 

import reducers from "./reducers/index";
const middleware = [thunk];

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(...middleware)));
// const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), composeWithDevTools(applyMiddleware(...middleware)));

export default store;

