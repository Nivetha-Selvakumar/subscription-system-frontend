import { all } from "redux-saga/effects";

import { watchFetchLoginData } from "./saga/LoginPage/LoginPageSaga";
import { watchUserCreate } from "./saga/AdminModule/AdminUsers/adminCreateUserSaga";
import { watchLogoutSaga } from "./saga/Logout/LogoutSaga";
import { watchUserList } from "./saga/AdminModule/AdminUsers/adminUserListSaga";
import { watchSignupUser } from "./saga/SignUpPage/signUpUserSaga";
import { watchUserEdit } from "./saga/AdminModule/AdminUsers/adminEditUserSaga";
import { watchUserDelete } from "./saga/AdminModule/AdminUsers/adminDeleteUserSaga";
import { watchUserView } from "./saga/AdminModule/AdminUsers/adminViewUserSaga";
import adminPlanListSaga from './saga/AdminModule/AdminPlan/adminPlanListSaga';
import { watchPlanCreateSaga } from './saga/AdminModule/AdminPlan/adminPlanCreateSaga';
import adminPlanViewSaga from './saga/AdminModule/AdminPlan/adminPlanViewSaga';
import adminPlanEditSaga from './saga/AdminModule/AdminPlan/adminPlanEditSaga';
import adminPlanDeleteSaga from './saga/AdminModule/AdminPlan/adminPlanDeleteSaga';
import adminPaymentListSaga from './saga/AdminModule/AdminPayment/adminPaymentListSaga';
import adminSupportTicketListSaga from './saga/AdminModule/AdminSupportTicket/adminSupportTicketListSaga';

export default function* rootSaga() {
  yield all([
    //Add other sagas here in future
    watchFetchLoginData(),
    watchLogoutSaga(),
    watchSignupUser(),
    watchUserList(),
    watchUserCreate(),
    watchUserEdit(),
    watchUserView(),
    watchUserDelete(),
    adminPlanListSaga(),
    watchPlanCreateSaga(),
    adminPlanViewSaga(),
    adminPlanEditSaga(),
    adminPlanDeleteSaga(),
    adminPaymentListSaga(),
    adminSupportTicketListSaga(),

  ]);
}