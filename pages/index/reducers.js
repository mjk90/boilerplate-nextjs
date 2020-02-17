import { Api, JsonRpc, RpcError } from 'eosjs';
import { combineReducers } from 'redux';
import { put, takeEvery, takeLatest, call, select, delay } from 'redux-saga/effects';
import { action } from 'typesafe-actions';

const createActionType = (actionPrefix) => (type) => `${actionPrefix}${type}`;

const actionPrefix = `Index::`;
const actionType = createActionType(actionPrefix);

/**
 * Create Action Type with `createActionType` function here
 */
const FETCH_START = actionType(`FETCH_START`);
const FETCH_FULFILLED = actionType(`FETCH_FULFILLED`);
const FETCH_REJECTED = actionType(`FETCH_REJECTED`);

/**
 * Action Creator function goes here
 */
const fetchStart = () => action(FETCH_START);
const fetchFulfilled = (table_rows) => action(FETCH_FULFILLED, table_rows);

/**
 * actions that allowed to be seen from outsider exports here
 * world outside can only reach start and cancelled
 */
export const actions = {
  fetchStart,
};

/**
 * `Saga` Side Effect handling function goes here
 */
export function* fetchStartSaga(action) {  
  try {
    const endpoint = "http://localhost:8888";
    const rpc = new JsonRpc(endpoint);
    const table_rows = yield rpc.get_table_rows({
      "json": true,
      "code": "notechainacc",   // contract who owns the table
      "scope": "notechainacc",  // scope of the table
      "table": "notestruct",    // name of the table as specified by the contract abi
      "limit": 100,
    });
    // console.log("fetchStartSaga", table_rows);
    yield put(fetchFulfilled(table_rows.rows));
    
  } catch (e) {
    // yield put(fetchFulfilled(e));
    console.log(e);
  }
}

/**
 * `WatchSaga` Register Watch function for each saga
 */
export function* watchFetchStartSaga() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

/**
 * combine all saga watchers and export
 */
export const combinedSaga = [watchFetchStartSaga];


const initialState = [];

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return state;
    case FETCH_FULFILLED:
      console.log("FETCH_FULFILLED", action.payload);      
      return action.payload;
    default:
      return state
  }
}

/**
 * `combinedReducer` export
 */
export const combinedReducer = combineReducers({
  data: dataReducer
});
