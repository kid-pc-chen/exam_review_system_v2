import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ExamReviewer from './components/examReviewer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Exam Review System v2.</h1>
        </header>
        <p className="App-intro">
          This toy project helps me to learn React.js + Redux.
        </p>
        <div className="App-content">
          <ExamReviewer/>
        </div>
      </div>
    );
  }
}

export default App;
