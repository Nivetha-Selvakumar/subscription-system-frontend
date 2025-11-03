// reducers.js

import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, } from '../../actionTypes/LoginPage/LoginActionTypes';

const initialState = {
    data: null,
    loading: false,

    error: null,
    successMessage: '',
    errorMessage: ''

};
const dataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,

                successMessage: '',
                errorMessage: ''


            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
                successMessage: 'Login Success', // Set success message here
                errorMessage: '',
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                data: null,
                loading: false,
                error: action.payload,

            };
        default:
            return state;
    }
};

export default dataReducer;