import { call, put, takeEvery } from 'redux-saga/effects';
import { PLAN_LIST_REQUEST, PLAN_LIST_SUCCESS, PLAN_LIST_FAILURE } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanListActionTypes';
import { API_BASE_URL } from '../../../endpoints/endpoints';

function* planListSaga(action: any): Generator<any, void, any> {
    try {
        const { search, sort, filter } = action.payload || {};
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (sort) params.append('sort', sort);
        if (filter) params.append('filter', filter);
        const response = yield call(
            fetch,
            `${API_BASE_URL}/plans${params.toString() ? '?' + params.toString() : ''}`
        );
        const data = yield call([response, 'json']);
        if (response.ok) {
            yield put({ type: PLAN_LIST_SUCCESS, payload: data });
        } else {
            yield put({ type: PLAN_LIST_FAILURE, payload: data?.message || 'Failed to fetch plans' });
        }
    } catch (error: any) {
        yield put({ type: PLAN_LIST_FAILURE, payload: error?.message || 'An error occurred' });
    }
}

export default function* adminPlanListSaga() {
    yield takeEvery(PLAN_LIST_REQUEST, planListSaga);
}
