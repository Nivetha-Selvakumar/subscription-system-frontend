import { combineReducers } from "@reduxjs/toolkit";

import LoginUserReducer from '../redux/reducer/LoginPage/LoginPageReducer';
import SignupUserReducer from "../redux/reducer/SignUpPage/SignUpReducer";
import LogoutReducer from "../redux/reducer/Logout/LogoutReducer";
import UserListReducer from "../redux/reducer/AdminModule/AdminUsers/adminUserListReducer";
import UserCreateReducer from "../redux/reducer/AdminModule/AdminUsers/adminCreateUserReducer";
import UserDeleteReducer from "../redux/reducer/AdminModule/AdminUsers/adminDeleteUserReducer";
import UserViewReducer from "../redux/reducer/AdminModule/AdminUsers/adminViewUserReducer";
import UserEditReducer from "../redux/reducer/AdminModule/AdminUsers/adminEditUserReducer";



const rootReducer = combineReducers({
    loginUserReducer: LoginUserReducer ,
    signupUserReducer: SignupUserReducer,
    logoutReducer: LogoutReducer,
    userListReducer: UserListReducer,
    userCreateReducer : UserCreateReducer,
    userEditReducer : UserEditReducer,
    userViewReducer : UserViewReducer,
    userDeleteReducer : UserDeleteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;