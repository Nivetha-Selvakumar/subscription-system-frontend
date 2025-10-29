import { combineReducers } from "@reduxjs/toolkit";

import LoginRequest from '../redux/reducer/LoginPage/LoginPageReducer';



const rootReducer = combineReducers({
    LoginRequest: LoginRequest ,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;