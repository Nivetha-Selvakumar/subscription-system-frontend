import { call, put, takeEvery } from 'redux-saga/effects';
import { PLAN_CREATE_REQUEST, PLAN_CREATE_SUCCESS, PLAN_CREATE_FAILURE } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanCreateActionTypes';
import { API_BASE_URL } from '../../../endpoints/endpoints';


// Prevent duplicate API hits
let isPrevent = false;
function* planCreateSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;
        const response = yield call(fetch, `${API_BASE_URL}/plans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        });
        const data = yield call([response, 'json']);
        if (response.ok) {
            yield put({ type: PLAN_CREATE_SUCCESS, payload: data });
        } else {
            yield put({ type: PLAN_CREATE_FAILURE, payload: data?.message || 'Failed to create plan' });
        }
    } catch (error: any) {
        yield put({ type: PLAN_CREATE_FAILURE, payload: error?.message || 'An error occurred' });
    }
}

export function* watchPlanCreateSaga() {
    yield takeEvery(PLAN_CREATE_REQUEST, planCreateSaga);
}
