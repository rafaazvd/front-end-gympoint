export function editInRequest(data) {
    return {
        type: '@helpOrders/POST_IN_REQUEST',
        payload: data,
    };
}

export function editInSuccess(data) {
    return {
        type: '@helpOrders/POST_IN_SUCCESS',
        payload: data,
    };
}

export function editInFailure() {
    return {
        type: '@helpOrders/POST_IN_FAILURE',
    };
}
