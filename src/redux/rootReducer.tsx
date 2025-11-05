import { combineReducers } from "@reduxjs/toolkit";

import LoginUserReducer from '../redux/reducer/LoginPage/LoginPageReducer';
import UserCreateReducer from "../redux/reducer/SignUpPage/SignUpReducer";
import LogoutReducer from "../redux/reducer/Logout/LogoutReducer";



const rootReducer = combineReducers({
    loginUserReducer: LoginUserReducer ,
    userCreateReducer: UserCreateReducer,
    logoutReducer: LogoutReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;