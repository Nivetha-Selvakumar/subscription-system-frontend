// sagas.js

import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../../common-components/ui/toastNotification";
import {
  userCreateFailure,
  userCreateSuccess,
} from "../../../action/AdminModule/AdminUsers/adminCreateUserAction";
import { USER_CREATE_REQUEST } from "../../../actionTypes/AdminModule/AdminUsers/adminCreateActionType";

// Prevent duplicate API hits
let isPrevent = false;

function* userCreateSaga(action: any): Generator<any, void, any> {
  if (isPrevent) return;

  try {
    isPrevent = true;

    const payload = action.payload;
    const tokenVal = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id"); // assuming admin is logged in

    // 🧠 Proper axios.post signature
    const response = yield call(
      axios.post,
      AUTH.USER_CREATE,
      payload, // ✅ body
      {
        headers: {
          Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
          "User-Id": user_id || "", // ✅ optional header
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Extract data
    const data = yield response.data;

    yield put(userCreateSuccess(data));
    showToast("User created successfully", "success", "User-Create");
  } catch (error: any) {
    yield put(userCreateFailure(error.message));

    const errorMessage = error?.response?.data?.Error;

    if (Array.isArray(errorMessage)) {
      showToast(errorMessage[0], "error", "User-Create");
    } else if (typeof errorMessage === "object" && errorMessage !== null) {
      showToast(JSON.stringify(errorMessage), "error", "User-Create");
    } else {
      showToast(
        errorMessage || "An unexpected error occurred",
        "error",
        "User-Create"
      );
    }
  } finally {
    isPrevent = false;
  }
}

export function* watchUserCreate() {
  yield takeLatest(USER_CREATE_REQUEST, userCreateSaga);
}
