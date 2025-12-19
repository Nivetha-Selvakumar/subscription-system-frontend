import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUserListSuccess,
  fetchUserListFailure,
} from "../../../action/AdminModule/AdminUsers/adminUserListAction";
import { USER_LIST_REQUEST } from "../../../actionTypes/AdminModule/AdminUsers/adminUsersListActionTypes";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* userListSaga(action: any): Generator<any, void, any> {
  if (isPrevent) return;

  try {
    isPrevent = true;

    const payload = action.payload;

    const tokenVal = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    const response = yield call(axios.get, AUTH.USER_LIST, {
      params: {
        search: payload.search || "",
        filterBy: payload.filterBy || "",
        sortBy: payload.sortBy || "firstName",
        sortDir: payload.sortDir || "asc",
        offset: payload.offset || 0,
        limit: payload.limit || 10,
      },
      headers: {
        Authorization: `Bearer ${tokenVal}`,
        "User-id": user_id,
      },
    });

    yield put(fetchUserListSuccess(response?.data));
  } catch (error: any) {
    yield put(fetchUserListFailure(error.message));

    const errorMessage = error?.response?.data?.Error 
    if (Array.isArray(errorMessage)) {
      showToast(errorMessage[0], "error", "Admin-User-List");
    } else if (typeof errorMessage === "object" && errorMessage !== null) {
      showToast(JSON.stringify(errorMessage), "error", "Admin-User-List");
    } else {
      showToast(errorMessage || "An error occurred", "error", "Admin-User-List");
    }
  } finally {
    isPrevent = false;
  }
}

export function* watchUserList() {
  yield takeLeading(USER_LIST_REQUEST, userListSaga);
}
