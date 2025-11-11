import { call, put, takeEvery } from 'redux-saga/effects';
import { PLAN_DELETE_REQUEST, PLAN_DELETE_SUCCESS, PLAN_DELETE_FAILURE } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanDeleteActionTypes';
import { API_BASE_URL } from '../../../endpoints/endpoints';

function* planDeleteSaga(action: any): Generator<any, void, any> {
    try {
        const planId = action.payload;
        const response = yield call(fetch, `${API_BASE_URL}/plans/${planId}`, {
            method: 'DELETE',
        });
        const data = yield call([response, 'json']);
        if (response.ok) {
            yield put({ type: PLAN_DELETE_SUCCESS, payload: data });
        } else {
            yield put({ type: PLAN_DELETE_FAILURE, payload: data?.message || 'Failed to delete plan' });
        }
    } catch (error: any) {
        yield put({ type: PLAN_DELETE_FAILURE, payload: error?.message || 'An error occurred' });
    }
}

export default function* adminPlanDeleteSaga() {
    yield takeEvery(PLAN_DELETE_REQUEST, planDeleteSaga);
}
