import React, { Component } from 'react'
import Counter from './Counter.js'
import { connect } from "react-redux";

class CounterGroup extends Component {
constructor(props) {
  super(props);
  this.state = {
      //take away sum state to inplement redux
      //sum:0,
      counters: new Array(5).fill(0).map(() => {return {number: 0, id: new Date().getTime + Math.random()}})
  }
}
  
  changeSize = (event) => {
    this.setState({
      counters: new Array(parseInt(this.refs.countInput.value))
      .fill(0)
      .map(() => {
        return { number: 0, id: new Date().getTime + Math.random() };
      }),
      //Still don't know how to implement
      sum: 0
    })
  }

  //when press onincrease or ondecrease, update state by redux instead of setState
  updateSum=(delta) => {
      //this.setState({sum: this.state.sum+delta})
      this.props.dispatch({
        type: "COUNTERSUM",
        payload: delta
      })
  }

  increaseUpdate = (changedNum, id) => {
    const counters = this.state.counters.map(
      counterItem => {
        if(counterItem.id === id){
          return {number: counterItem.number + changedNum, id: id}
        } else {
          return counterItem
        }
      }
    )
    this.setState({counters: counters})
  }

  decreaseUpdate = (changedNum, id) => {
    const counters = this.state.counters.map(
      counterItem => {
        if(counterItem.id === id){
          return {number: counterItem.number - changedNum, id: id}
        } else {
          return counterItem
        }
      }
    )
    this.setState({counters: counters})
  }

  render() {
    return (
      <div>
        {this.state.counters.map(counterItem => (
          <Counter 
          key={counterItem.id}
          id={counterItem.id}
          onUpdate={this.updateSum} 
          onIncrease={this.increaseUpdate} 
          onDecrease={this.decreaseUpdate} 
          counterNum={counterItem.number}/>
          )
        )}
        <input type="text" ref="countInput" />
        <button onClick={this.changeSize}>
        generate
        </button>
        <span>sum: {this.props.counterSum}</span>
      </div>
    )
  }
}

//map state from reduce index.js
const mapStateToProps = state => ({
  //construct counterSum to store state and act as props
  counterSum: state.sum
}); 

connect(mapStateToProps)(CounterGroup)

export default connect(mapStateToProps)(CounterGroup) 