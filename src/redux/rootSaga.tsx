import { all } from "redux-saga/effects";

import { watchFetchData } from "./saga/LoginPage/LoginPageSaga";

export default function* rootSaga() {
  yield all([  
    //Add other sagas here in future
    watchFetchData(),
  ]);
}