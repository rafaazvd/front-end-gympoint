import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
    postInSuccess,
    postInFailure,
    editInSuccess,
    editInFailure,
} from './actions';
import history from '../../../services/history';
import api from '../../../services/api';

export function* store({ payload }) {
    try {
        const response = yield call(api.post, 'students', payload);

        if (response) {
            yield put(postInSuccess(payload));
            toast.success('Registro salvo!');
            history.push('/alunos');
        }
    } catch (err) {
        toast.error(err.response.data.error);
        yield put(postInFailure());
    }
}

export function* update({ payload }) {
    try {
        const response = yield call(api.put, `students/${payload.id}`, payload);
        if (response) {
            yield put(editInSuccess(payload));
            toast.success('Registro atualizado!');
            history.push('/alunos');
        }
    } catch (err) {
        toast.error(err.response.data.error);
        yield put(editInFailure());
    }
}

export default all([
    takeLatest('@student/POST_IN_REQUEST', store),
    takeLatest('@student/EDIT_IN_REQUEST', update),
]);
