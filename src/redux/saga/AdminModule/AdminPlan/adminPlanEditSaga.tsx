import { call, put, takeEvery } from 'redux-saga/effects';
import { PLAN_EDIT_REQUEST, PLAN_EDIT_SUCCESS, PLAN_EDIT_FAILURE } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanEditActionTypes';
import { API_BASE_URL } from '../../../endpoints/endpoints';

function* planEditSaga(action: any): Generator<any, void, any> {
    try {
        const { planId, ...planData } = action.payload;
        const response = yield call(fetch, `${API_BASE_URL}/plans/${planId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(planData),
        });
        const data = yield call([response, 'json']);
        if (response.ok) {
            yield put({ type: PLAN_EDIT_SUCCESS, payload: data });
        } else {
            yield put({ type: PLAN_EDIT_FAILURE, payload: data?.message || 'Failed to update plan' });
        }
    } catch (error: any) {
        yield put({ type: PLAN_EDIT_FAILURE, payload: error?.message || 'An error occurred' });
    }
}

export default function* adminPlanEditSaga() {
    yield takeEvery(PLAN_EDIT_REQUEST, planEditSaga);
}
