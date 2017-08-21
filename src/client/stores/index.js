import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "../reducers";

const configureStore = (initialState) => createStore(reducers, initialState, applyMiddleware(thunk, logger));

export default configureStore;