// import { createStore, applyMiddleware } from "redux";
// import {composeWithDevTools} from 'redux-devtools-extension'
// import rootReducer from "../reducer";
// import thunk from "redux-thunk";

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// export default store;

import rootReducer from "../reducer/reducer.js";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
