import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import header from './header/reducer';
import student from './students/reducer';
import plan from './Plans/reducer';
import helpOrders from './helpOrders/reducer';
import enrollment from './enrollment/reducer';

export default combineReducers({
    auth,
    user,
    header,
    student,
    plan,
    helpOrders,
    enrollment,
});
