import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import AllReducers from './reducers';
import { logger } from "redux-logger/src";
import thunk from "redux-thunk";
import promise from 'redux-promise';

const reducer = combineReducers(AllReducers);
const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = storeEnhancer(applyMiddleware(thunk, promise, logger));
const store = createStore(reducer, middleware);

export default store;
