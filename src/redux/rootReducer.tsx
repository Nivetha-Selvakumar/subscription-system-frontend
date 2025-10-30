import { combineReducers } from "@reduxjs/toolkit";

import LoginRequest from '../redux/reducer/LoginPage/LoginPageReducer';
import UserCreateReducer from "../redux/reducer/SignUpPage/SignUpReducer";



const rootReducer = combineReducers({
    LoginRequest: LoginRequest ,
    userCreateReducer: UserCreateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;