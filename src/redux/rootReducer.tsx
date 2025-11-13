import { combineReducers } from "@reduxjs/toolkit";

import LoginUserReducer from '../redux/reducer/LoginPage/LoginPageReducer';
import SignupUserReducer from "../redux/reducer/SignUpPage/SignUpReducer";
import LogoutReducer from "../redux/reducer/Logout/LogoutReducer";
import UserListReducer from "../redux/reducer/AdminModule/AdminUsers/adminUserListReducer";
import UserCreateReducer from "../redux/reducer/AdminModule/AdminUsers/adminCreateUserReducer";
import UserDeleteReducer from "../redux/reducer/AdminModule/AdminUsers/adminDeleteUserReducer";
import UserViewReducer from "../redux/reducer/AdminModule/AdminUsers/adminViewUserReducer";
import UserEditReducer from "../redux/reducer/AdminModule/AdminUsers/adminEditUserReducer";

import PlanListReducer from "../redux/reducer/AdminModule/AdminPlan/adminPlanListReducer";
import PlanCreateReducer from "../redux/reducer/AdminModule/AdminPlan/adminPlanCreateReducer";
import PlanEditReducer from "../redux/reducer/AdminModule/AdminPlan/adminPlanEditReducer";
import PlanDeleteReducer from "../redux/reducer/AdminModule/AdminPlan/adminPlanDeleteReducer";
import PlanViewReducer from "../redux/reducer/AdminModule/AdminPlan/adminPlanViewReducer";
import PaymentListReducer from "../redux/reducer/AdminModule/AdminPayment/adminPaymentListReducer";
import SupportTicketListReducer from "../redux/reducer/AdminModule/AdminSupportTicket/adminSupportTicketListReducer";

import UserFeedbackCreateReducer from "../redux/reducer/UserModule/UserFeedback/userFeedbackCreateReducer";
import UserFeedbackDeleteReducer from "../redux/reducer/UserModule/UserFeedback/userFeedbackDeleteReducer";
import UserFeedbackEditReducer from "../redux/reducer/UserModule/UserFeedback/userFeedbackEditReducer";
import UserFeedbackListReducer from "../redux/reducer/UserModule/UserFeedback/userFeedbackListReducer";
import UserFeedbackViewReducer from "../redux/reducer/UserModule/UserFeedback/userFeedbackViewReducer";

const rootReducer = combineReducers({
    loginUserReducer: LoginUserReducer,
    signupUserReducer: SignupUserReducer,
    logoutReducer: LogoutReducer,
    userListReducer: UserListReducer,
    userCreateReducer: UserCreateReducer,
    userEditReducer: UserEditReducer,
    userViewReducer: UserViewReducer,
    userDeleteReducer: UserDeleteReducer,
    planListReducer: PlanListReducer,
    planCreateReducer: PlanCreateReducer,
    planEditReducer: PlanEditReducer,
    planDeleteReducer: PlanDeleteReducer,
    planViewReducer: PlanViewReducer,
    paymentListReducer: PaymentListReducer,
    supportTicketListReducer: SupportTicketListReducer,

    userFeedbackCreateReducer: UserFeedbackCreateReducer,
    userFeedbackDeleteReducer: UserFeedbackDeleteReducer,
    userFeedbackEditReducer: UserFeedbackEditReducer,
    userFeedbackListReducer: UserFeedbackListReducer,
    userFeedbackViewReducer: UserFeedbackViewReducer,

});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;