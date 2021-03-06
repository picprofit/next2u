import { compose, applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import apiWatcherSaga from './middlewares/apiSaga';
import saveUserDataToLocal from './middlewares/saveUserDataToLocal';
import mergeTasksWithLocal from './middlewares/mergeTasksWithLocal';

const initialState = {
  tasks: {
    fetching: false,
    data:
      typeof window.__DATA__ !== 'undefined' &&
      typeof window.__DATA__.tasks !== 'undefined'
        ? window.__DATA__.tasks
        : {},
    error: null
  },
  users: {
    fetching: false,
    data: null,
    error: null
  },
  user:
    typeof window.__DATA__ !== 'undefined' &&
    typeof window.__DATA__.user !== 'undefined'
      ? window.__DATA__.user
      : {}
};

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers();

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware, saveUserDataToLocal, mergeTasksWithLocal),
    enhancer
  )
);

// run the saga
sagaMiddleware.run(apiWatcherSaga);

export default store;
