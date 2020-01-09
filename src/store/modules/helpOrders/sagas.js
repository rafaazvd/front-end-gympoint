import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { editInSuccess, editInFailure } from './actions';
import history from '../../../services/history';

export function* store({ payload }) {
    try {
        const response = yield call(
            api.put,
            `/help-orders/${payload.id}/answer`,
            payload
        );
        if (response) {
            yield put(editInSuccess(payload));
            toast.success('Registro salvo!');
            history.push('/auxilio');
        }
    } catch (err) {
        toast.error(err.response.data.error);
        yield put(editInFailure());
    }
}

export default all([takeLatest('@helpOrders/POST_IN_REQUEST', store)]);
