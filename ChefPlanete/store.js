import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import AllReducers from './reducers';
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import promise from 'redux-promise';

const logger = createLogger({
  collapsed: true,
});

const reducer = combineReducers(AllReducers);
const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = storeEnhancer(applyMiddleware(thunk, promise, logger));
const store = createStore(reducer, middleware);

export default store;
