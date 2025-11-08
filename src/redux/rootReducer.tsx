import { combineReducers } from "@reduxjs/toolkit";

import LoginUserReducer from '../redux/reducer/LoginPage/LoginPageReducer';
import SignupUserReducer from "../redux/reducer/SignUpPage/SignUpReducer";
import LogoutReducer from "../redux/reducer/Logout/LogoutReducer";
import UserListReducer from "../redux/reducer/AdminModule/AdminUsers/adminUserListReducer";



const rootReducer = combineReducers({
    loginUserReducer: LoginUserReducer ,
    signupUserReducer: SignupUserReducer,
    logoutReducer: LogoutReducer,
    userListReducer: UserListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;