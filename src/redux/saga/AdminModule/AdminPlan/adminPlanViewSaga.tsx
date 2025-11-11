import { call, put, takeEvery } from 'redux-saga/effects';
import { PLAN_VIEW_REQUEST, PLAN_VIEW_SUCCESS, PLAN_VIEW_FAILURE } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanViewActionTypes';
import { API_BASE_URL } from '../../../endpoints/endpoints';

function* planViewSaga(action: any): Generator<any, void, any> {
    try {
        const planId = action.payload;
        const response = yield call(fetch, `${API_BASE_URL}/plans/${planId}`);
        const data = yield call([response, 'json']);
        if (response.ok) {
            yield put({ type: PLAN_VIEW_SUCCESS, payload: data });
        } else {
            yield put({ type: PLAN_VIEW_FAILURE, payload: data?.message || 'Failed to fetch plan' });
        }
    } catch (error: any) {
        yield put({ type: PLAN_VIEW_FAILURE, payload: error?.message || 'An error occurred' });
    }
}

export default function* adminPlanViewSaga() {
    yield takeEvery(PLAN_VIEW_REQUEST, planViewSaga);
}
