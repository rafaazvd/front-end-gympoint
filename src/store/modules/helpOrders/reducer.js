import produce from 'immer';

const INITIAL_STATE = {
    answer: [],
    loading: false,
};

export default function helpOrders(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@helpOrders/POST_IN_REQUEST':
                draft.data = action.payload;
                draft.loading = true;
                break;
            case '@helpOrders/POST_IN_SUCCESS':
                draft.data = action.payload;
                draft.loading = false;
                break;
            case '@helpOrders/POST_FAILURE':
                draft.loading = false;
                break;
            default:
        }
    });
}
