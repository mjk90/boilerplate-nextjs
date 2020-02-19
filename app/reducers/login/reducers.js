import { Api, JsonRpc, RpcError } from 'eosjs';
import { combineReducers } from 'redux';
import { put, takeEvery, takeLatest, call, select, delay } from 'redux-saga/effects';
import { action } from 'typesafe-actions';
import { get } from '../../lib/ioService';
import { Cookies } from 'react-cookie';

const createActionType = (actionPrefix) => (type) => `${actionPrefix}${type}`;

const actionPrefix = `Login::`;
const actionType = createActionType(actionPrefix);

/**
 * Create Action Type with `createActionType` function here
 */
const LOGIN = actionType(`LOGIN`);
const LOGIN_FULFILLED = actionType(`LOGIN_FULFILLED`);
const LOGIN_REJECTED = actionType(`LOGIN_REJECTED`);

/**
 * Action Creator function goes here
 */
const login = () => action(LOGIN);
const loginFulfilled = (token) => action(LOGIN_FULFILLED, token);

/**
 * actions that allowed to be seen from outsider exports here
 * world outside can only reach start and cancelled
 */
export const actions = {
  login,
};

/**
 * `Saga` Side Effect handling function goes here
 */
export function* loginSaga(action) {  
  try {
    const cookies = new Cookies();
    const loginUrl = 'http://localhost:3001/api/login';
    const response = yield call(get, loginUrl);
    const responseToken = response.data.token;
    if(!!responseToken) {
      cookies.set('token', responseToken);
      yield put(loginFulfilled(responseToken));
    }
  } catch (e) {
    // yield put(fetchFulfilled(e));
    console.log(e);
  }
}

/**
 * `WatchSaga` Register Watch function for each saga
 */
export function* watchLoginSaga() {
  yield takeEvery(LOGIN, loginSaga);
}

/**
 * combine all saga watchers and export
 */
export const combinedSaga = [watchLoginSaga];


const initialState = "";

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return state;
    case LOGIN_FULFILLED:   
      return action.payload;
    default:
      return state
  }
}

/**
 * `combinedReducer` export
 */
export const combinedReducer = combineReducers({
  token: tokenReducer
});
