import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
// import { rootReducer, rootSaga } from 'reducers';

const initialState = {
  data: {}
} 

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TABLE':
      return {
        ...state,
        data: action.data
      }
    // case 'RESET':
    //   return {
    //     ...state,
    //     count: initialState.count,
    //   }
    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  // saga setup
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(/*...middlewares*/))
  );

  // rootSaga.forEach(sagaMiddleware.run);

  return store;
}
