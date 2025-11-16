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

import SupportTicketCreateReducer from "../redux/reducer/AdminModule/AdminSupportTicket/adminSupportTicketCreateReducer";
import SupportTicketEditReducer from "../redux/reducer/AdminModule/AdminSupportTicket/adminSupportTicketEditReducer";
import SupportTicketResponseCreateReducer from "../redux/reducer/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateReducer";
import SupportTicketResponseDeleteReducer from "../redux/reducer/AdminModule/AdminSupportTicket/adminSupportTicketResponseDeleteReducer";
import SupportTicketResponseEditReducer from "../redux/reducer/AdminModule/AdminSupportTicket/adminSupportTicketResponseEditReducer";
import SupportTicketViewReducer from "../redux/reducer/AdminModule/AdminSupportTicket/adminSupportTicketViewReducer";


import SubscriptionCancelReducer from "../redux/reducer/UserModule/UserSubscription/userSubscriptionCancelReducer";
import SubscriptionCreateReducer from "../redux/reducer/UserModule/UserSubscription/userSubscriptionCreateReducer";
import SubscriptionPaymentListReducer from "./reducer/UserModule/UserSubscription/userSubscriptionPaymentListReducer";
import SubscriptionUpdateReducer from "../redux/reducer/UserModule/UserSubscription/userSubscriptionUpdateReducer";
import SubscriptionViewReducer from "../redux/reducer/UserModule/UserSubscription/userSubscriptionViewReducer";


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

    userFeedbackCreateReducer: UserFeedbackCreateReducer,
    userFeedbackDeleteReducer: UserFeedbackDeleteReducer,
    userFeedbackEditReducer: UserFeedbackEditReducer,
    userFeedbackListReducer: UserFeedbackListReducer,
    userFeedbackViewReducer: UserFeedbackViewReducer,

    supportTicketCreateReducer: SupportTicketCreateReducer,
    supportTicketEditReducer: SupportTicketEditReducer,
    supportTicketListReducer: SupportTicketListReducer,
    supportTicketResponseCreateReducer: SupportTicketResponseCreateReducer,
    supportTicketResponseDeleteReducer: SupportTicketResponseDeleteReducer,
    supportTicketResponseEditReducer: SupportTicketResponseEditReducer,
    supportTicketViewReducer: SupportTicketViewReducer,

    subscriptionCancelReducer: SubscriptionCancelReducer,
    subscriptionCreateReducer: SubscriptionCreateReducer,
    subscriptionPaymentListReducer: SubscriptionPaymentListReducer,
    subscriptionUpdateReducer: SubscriptionUpdateReducer,
    subscriptionViewReducer: SubscriptionViewReducer,

});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;