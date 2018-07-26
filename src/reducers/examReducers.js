import { CHANGE_EXAM_OPTION } from '../actions/userActions.js';
import { CHANGE_SEARCH_INPUT } from '../actions/userActions.js';

const initialState = {
    keyword: '',
    examOption: 'exam1'
};

function onUserChange(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case CHANGE_EXAM_OPTION:
            return {
                keyword: '',
                examOption: action.text
            };

        case CHANGE_SEARCH_INPUT:
            return {
                keyword: action.text,
                examOption: state.examOption
            };

        default:
            return state;
    }
}

export default onUserChange;
