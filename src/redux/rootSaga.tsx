import { all } from "redux-saga/effects";

import { watchFetchLoginData } from "./saga/LoginPage/LoginPageSaga";
import { watchUserCreate } from "./saga/AdminModule/AdminUsers/adminCreateUserSaga";
import { watchLogoutSaga } from "./saga/Logout/LogoutSaga";
import { watchUserList } from "./saga/AdminModule/AdminUsers/adminUserListSaga";
import { watchSignupUser } from "./saga/SignUpPage/signUpUserSaga";
import { watchUserEdit } from "./saga/AdminModule/AdminUsers/adminEditUserSaga";
import { watchUserDelete } from "./saga/AdminModule/AdminUsers/adminDeleteUserSaga";
import { watchUserView } from "./saga/AdminModule/AdminUsers/adminViewUserSaga";
import adminPaymentListSaga from './saga/AdminModule/AdminPayment/adminPaymentListSaga';
import { watchPlanView } from "./saga/AdminModule/AdminPlan/adminPlanViewSaga";
import { watchPlanCreate } from "./saga/AdminModule/AdminPlan/adminPlanCreateSaga";
import { watchPlanEdit } from "./saga/AdminModule/AdminPlan/adminPlanEditSaga";
import { watchPlanList } from "./saga/AdminModule/AdminPlan/adminPlanListSaga";
import { watchPlanDelete } from "./saga/AdminModule/AdminPlan/adminPlanDeleteSaga";
import { watchUserFeedbackCreate } from "./saga/UserModule/UserFeedback/userFeedbackCreateSaga";
import { watchuserFeedbackDelete } from "./saga/UserModule/UserFeedback/userFeedbackDeleteSaga";
import { watchuserFeedbackEdit } from "./saga/UserModule/UserFeedback/userFeedbackEditSaga";
import { watchUserFeedbackList } from "./saga/UserModule/UserFeedback/userFeedbackListSaga";
import { watchUserFeedbackView } from "./saga/UserModule/UserFeedback/userFeedbackViewSaga";
import { watchSupportTicketList } from './saga/AdminModule/AdminSupportTicket/adminSupportTicketListSaga';
import { watchSupportTicketCreate } from './saga/AdminModule/AdminSupportTicket/adminSupportTicketCreateSaga';
import { watchSupportTicketEdit } from './saga/AdminModule/AdminSupportTicket/adminSupportTicketEditSaga';
import { watchSupportTicketResponseCreate } from './saga/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateSaga';
import { watchSupportTicketResponseDelete } from './saga/AdminModule/AdminSupportTicket/adminSupportTicketResponseDeleteSaga';
import { watchSupportTicketResponseEdit } from './saga/AdminModule/AdminSupportTicket/adminSupportTicketResponseEditSaga';
import { watchSupportTicketView } from './saga/AdminModule/AdminSupportTicket/adminSupportTicketViewSaga';
import { watchSubscriptionCancel } from './saga/UserModule/UserSubscription/userSubscriptionCancelSaga';
import { watchSubscriptionCreate } from './saga/UserModule/UserSubscription/userSubscriptionCreateSaga';
import { watchSubscriptionPaymentList } from './saga/UserModule/UserSubscription/userSubscriptionPaymentListSaga';
import { watchSubscriptionEdit } from './saga/UserModule/UserSubscription/userSubscriptionUpdateSaga';
import { watchUserSubscriptionView } from './saga/UserModule/UserSubscription/userSubscriptionViewSaga';

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

    watchPlanView(),
    watchPlanCreate(),
    watchPlanDelete(),
    watchPlanEdit(),
    watchPlanList(),

    adminPaymentListSaga(),

    watchUserFeedbackCreate(),
    watchuserFeedbackEdit(),
    watchuserFeedbackDelete(),
    watchUserFeedbackList(),
    watchUserFeedbackView(),

    watchSupportTicketList(),
    watchSupportTicketCreate(),
    watchSupportTicketEdit(),
    watchSupportTicketResponseCreate(),
    watchSupportTicketResponseDelete(),
    watchSupportTicketResponseEdit(),
    watchSupportTicketView(),

    watchSubscriptionCancel(),
    watchSubscriptionCreate(),
    watchSubscriptionPaymentList(),
    watchSubscriptionEdit(),
    watchUserSubscriptionView(),

  ]);
}