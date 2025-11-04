import { combineReducers } from "@reduxjs/toolkit";

import LoginUserReducer from '../redux/reducer/LoginPage/LoginPageReducer';
import UserCreateReducer from "../redux/reducer/SignUpPage/SignUpReducer";



const rootReducer = combineReducers({
    loginUserReducer: LoginUserReducer ,
    userCreateReducer: UserCreateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;