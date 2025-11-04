// reducers.js

import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_CLEAR, } from '../../actionTypes/LoginPage/LoginActionTypes'



const initialState = {
    loginUser: null,
    loginUserLoading: false,
    error: null,
};

const loginUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loginUser: null,
                loginUserLoading: true,
                error: null,
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loginUser: action.payload,
                loginUserLoading: false,
                error: null,
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loginUser: null,
                loginUserLoading: false,
                error: action.payload,
            };

        case FETCH_DATA_CLEAR:
            return {
                loginUser: null,
                loginUserLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default loginUserReducer;