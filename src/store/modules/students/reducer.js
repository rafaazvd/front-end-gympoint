import produce from 'immer';

const INITIAL_STATE = {
    student: [],
    loading: false,
};

export default function student(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@student/POST_IN_REQUEST':
                draft.loading = true;
                break;
            case '@student/POST_IN_SUCCESS':
                draft.data = action.payload;
                draft.loading = false;
                break;
            case '@student/POST_FAILURE':
                draft.loading = false;
                break;
            case '@student/EDIT_IN_REQUEST':
                draft.loading = true;
                draft.student = action.payload;
                break;
            case '@student/EDIT_IN_SUCCESS':
                draft.loading = false;
                draft.student = action.payload;
                break;
            case '@student/EDIT_FAILURE':
                draft.loading = false;
                break;
            default:
        }
    });
}
