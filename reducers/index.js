import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

/**
 * Import reducers and sagas here
 */
import { combinedReducer as indexReducer, combinedSaga as indexSaga } from './home/reducers';
import { combinedReducer as aboutReducer, combinedSaga as aboutSaga } from './about/reducers';

export function* rootSaga() {
  yield fork(...indexSaga, 'indexPage');
  yield fork(...aboutSaga, 'aboutPage');
}

export const rootReducer = combineReducers({
  indexPage: indexReducer,
  aboutPage: aboutReducer
});
