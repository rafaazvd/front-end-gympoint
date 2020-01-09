import produce from 'immer';

const INITIAL_STATE = {
    enrollment: [],
    loading: false,
};

export default function enrollment(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@enrollment/POST_IN_REQUEST':
                draft.loading = true;
                break;
            case '@enrollment/POST_IN_SUCCESS':
                draft.data = action.payload;
                draft.loading = false;
                break;
            case '@enrollment/POST_FAILURE':
                draft.loading = false;
                break;
            case '@enrollment/EDIT_IN_REQUEST':
                draft.loading = true;
                draft.enrollment = action.payload;
                break;
            case '@enrollment/EDIT_IN_SUCCESS':
                draft.loading = false;
                draft.enrollment = action.payload;
                break;
            case '@enrollment/EDIT_FAILURE':
                draft.loading = false;
                break;
            case '@enrollment/DELETE_IN_REQUEST':
                draft.loading = true;
                draft.enrollment = action.payload;
                break;
            case '@enrollment/DELETE_IN_SUCCESS':
                draft.loading = false;
                draft.enrollment = action.payload;
                break;
            case '@enrollment/DELETE_FAILURE':
                draft.loading = false;
                break;
            default:
        }
    });
}
