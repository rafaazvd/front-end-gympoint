import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import header from './header/sagas';
import student from './students/sagas';
import plan from './Plans/sagas';
import helpOrders from './helpOrders/sagas';
import enrollment from './enrollment/sagas';

export default function* rootSaga() {
    return yield all([auth, user, header, student, plan, helpOrders, enrollment]);
}
