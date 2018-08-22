import React from 'react'
import { changeExamOption, changeSearchInput } from '../actions/userActions.js'
import store from '../store/examStore.js'

import exam1 from '../exam_data/exam1'
import exam2 from '../exam_data/exam2'
import exam3 from '../exam_data/exam3'

class ExamReviewer extends React.Component {
  constructor (props, context) {
    let state = store.getState()
    super(props, context)
    this.state = {
      keyword: state.keyword,
      exam_option: state.examOption
    }
  }

  componentDidMount () {
    const self = this
    store.subscribe(function () {
      const state = store.getState()
      self.setState({ keyword: state.keyword, exam_option: state.examOption })
    })
  }

  render () {
    const examList = {
      'exam1': exam1,
      'exam2': exam2,
      'exam3': exam3
    }

    return (
      <div>
        <ExamSelector />
        <SearchBox defaultKeyword={this.state.keyword} />
        <QuestionsList exam={examList[this.state.exam_option]} keyword={this.state.keyword} />
      </div>
    )
  }
}

class ExamSelector extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  /*
    1. 當使用者透過view選擇試題後，此時會產生一個action (changeExamOption)，
      並透過store的dispatch方法，將包含CHANGE_EXAM_OPTION和
      資料(選擇的試題，來自event.target.value)傳遞給store
    2. Store會將當前的state與action傳遞給reducer，reducer根據我們設計的邏輯，
      回傳新的state給store
    3. 接著store利用reducer傳回的新的state，取代store原先的state，並call所有
     ExamReviewer component subscribe(s)的callback function (e.g. line 21)
    4. ExamReviewer在subscribe function的callback function中，透過store提供的方法getState
      取得store新的state，並根據store新的state來變更component自身的state，因此觸發ExamReviewer
      重新render
  */
  handleChange (event) {
    store.dispatch(changeExamOption(event.target.value))
  }

  render () {
    return (
      <div>
        <h1>試卷選擇 Choosing examination paper</h1>
        <select onChange={this.handleChange}>
          <option value='exam1'>試卷1</option>
          <option value='exam2'>試卷2</option>
          <option value='exam3'>試卷3</option>
        </select>
      </div>
    )
  }
}

class SearchBox extends React.Component {
  constructor (props) {
    super(props)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange (event) {
    store.dispatch(changeSearchInput(event.target.value))
  }

  render () {
    const {defaultKeyword} = this.props
    return (
      <div>
        <h1>關鍵字查詢 Keyword search</h1>
        <input type='text' placeholder='在此輸入關鍵字' value={defaultKeyword} onChange={this.handleTextChange} />
      </div>
    )
  }
}

// https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
function getHighlightedText (text, higlight) {
  // Split on higlight term and include term into parts, ignore case
  let parts = text.split(new RegExp(`(${higlight})`, 'gi'))
  return <span> { parts.map((part, i) =>
    <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { backgroundColor: 'yellow' } : {}}>
      { part }
    </span>)
  } </span>
}

class QuestionsList extends React.Component {
  render () {
    const {keyword} = this.props
    const {exam} = this.props
    return (
      <div> {
        Object.keys(exam).map(function (k, i) {
          // console.log("this: " + this);
          return (
            <div key={'examType' + i}>
              <h1 key={'examType' + i}> {k} </h1>
              <div>
                {
                  exam[k].map(function (question, j) {
                    // console.log("keyword: " + keyword);
                    return question.toLowerCase().includes(keyword.toLowerCase())
                      ? (<div key={'question' + j}> {getHighlightedText(question, keyword)} </div>)
                      : (<div key={'question' + j} />)
                  })
                }
              </div>
            </div>
          )
        })
      } </div>
    )
  }
}

export default ExamReviewer
