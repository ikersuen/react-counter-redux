import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CounterGroup from './components/CounterGroup.js'
import reducer from "./reducer";
import {createStore} from "redux";
import { Provider } from "react-redux";

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <div>
      <Provider store={store}> 
        <CounterGroup />
      </Provider>
      </div>
    );
  }
}
export default App;
