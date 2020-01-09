export function postInRequest(data) {
    return {
        type: '@student/POST_IN_REQUEST',
        payload: data,
    };
}

export function postInSuccess(data) {
    return {
        type: '@student/POST_IN_SUCCESS',
        payload: data,
    };
}

export function postInFailure() {
    return {
        type: '@student/POST_IN_FAILURE',
    };
}

export function editInRequest(data) {
    return {
        type: '@student/EDIT_IN_REQUEST',
        payload: data,
    };
}

export function editInSuccess(data) {
    return {
        type: '@student/EDIT_IN_SUCCESS',
        payload: data,
    };
}

export function editInFailure() {
    return {
        type: '@student/EDIT_IN_FAILURE',
    };
}
