import { combineReducers } from 'redux';
import { Saga } from 'redux-saga';

/**
 * Import reducers and sagas here
 */
import { combinedReducer as indexReducer, combinedSaga as indexSaga } from '../pages/index/reducers';

export const rootSaga = [
  ...actionDetailsSaga
];

export const rootReducer = combineReducers({
  actionDetails: actionDetailsReducer
});
