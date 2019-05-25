import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import sagas from './saga';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

export const createReduxStore = (preloadedState) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducers, preloadedState, compose(applyMiddleware(sagaMiddleware, logger)));

    sagaMiddleware.run(sagas);

    return store;
};