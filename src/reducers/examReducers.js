import {
  CHANGE_EXAM_OPTION,
  CHANGE_SEARCH_INPUT
} from '../actions/userActions.js'

const initialState = {
  keyword: '',
  examOption: 'exam1'
}

// 回傳的新的state比需視一個全新的state物件，
// 而不是修改原本的state物件
function onUserChange (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case CHANGE_EXAM_OPTION:
      return {
        keyword: '',
        examOption: action.text
      }

    case CHANGE_SEARCH_INPUT:
      return {
        keyword: action.text,
        examOption: state.examOption
      }

    default:
      return state
  }
}

export default onUserChange
