import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './reducers';

export const initializeStore = (preloadedState = {}) => {
  // saga setup
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  rootSaga.forEach(sagaMiddleware.run);

  console.log("store", store);
  
  return store;
}
