import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

/**
 * Import reducers and sagas here
 */
import { combinedReducer as indexReducer, combinedSaga as indexSaga } from './home/reducers';
import { combinedReducer as aboutReducer, combinedSaga as aboutSaga } from './about/reducers';
import { combinedReducer as loginReducer, combinedSaga as loginSaga } from './login/reducers';

export function* rootSaga() {
  yield fork(...indexSaga, 'indexPage');
  yield fork(...aboutSaga, 'aboutPage');
  yield fork(...loginSaga, 'loginPage');
}

export const rootReducer = combineReducers({
  indexPage: indexReducer,
  aboutPage: aboutReducer,
  loginPage: loginReducer
});
