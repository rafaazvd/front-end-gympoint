export function postInRequest(data) {
    return {
        type: '@plan/POST_IN_REQUEST',
        payload: data,
    };
}

export function postInSuccess(data) {
    return {
        type: '@plan/POST_IN_SUCCESS',
        payload: data,
    };
}

export function postInFailure() {
    return {
        type: '@plan/POST_IN_FAILURE',
    };
}

export function editInRequest(data) {
    return {
        type: '@plan/EDIT_IN_REQUEST',
        payload: data,
    };
}

export function editInSuccess(data) {
    return {
        type: '@plan/EDIT_IN_SUCCESS',
        payload: data,
    };
}

export function editInFailure() {
    return {
        type: '@plan/EDIT_IN_FAILURE',
    };
}

export function deleteInRequest(data) {
    return {
        type: '@plan/DELETE_IN_REQUEST',
        payload: data,
    };
}

export function deleteInSuccess(data) {
    return {
        type: '@plan/DELETE_IN_SUCCESS',
        payload: data,
    };
}

export function deleteInFailure() {
    return {
        type: '@plan/DELETE_IN_FAILURE',
    };
}
