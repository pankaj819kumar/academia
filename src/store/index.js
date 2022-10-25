import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import logger from 'redux-logger';

let store;

export function configureStore() {
  store = createStore(reducers, applyMiddleware(thunk, logger));

  return store;
}