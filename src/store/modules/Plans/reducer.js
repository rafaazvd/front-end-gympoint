import produce from 'immer';

const INITIAL_STATE = {
    plan: [],
    loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@plan/POST_IN_REQUEST':
                draft.loading = true;
                break;
            case '@plan/POST_IN_SUCCESS':
                draft.data = action.payload;
                draft.loading = false;
                break;
            case '@plan/POST_FAILURE':
                draft.loading = false;
                break;
            case '@plan/EDIT_IN_REQUEST':
                draft.loading = true;
                draft.plan = action.payload;
                break;
            case '@plan/EDIT_IN_SUCCESS':
                draft.loading = false;
                draft.plan = action.payload;
                break;
            case '@plan/EDIT_FAILURE':
                draft.loading = false;
                break;
            case '@plan/DELETE_IN_REQUEST':
                draft.loading = true;
                draft.plan = action.payload;
                break;
            case '@plan/DELETE_IN_SUCCESS':
                draft.loading = false;
                draft.plan = action.payload;
                break;
            case '@plan/DELETE_FAILURE':
                draft.loading = false;
                break;
            default:
        }
    });
}
