import React, { Component } from 'react'
import Counter from './Counter.js'
import { connect } from "react-redux";

class CounterGroup extends Component {
constructor(props) {
  super(props);
  this.state = {
      //take away sum state to inplement redux
      //sum:0,
      counters: new Array(this.props.defaultValue).fill(0).map(() => {return {number: 0, id: new Date().getTime + Math.random()}})
  }
  this.props.dispatch(
    {
    type: "GENERATE_COUNTERS",
    payload: parseInt(this.props.defaultValue)
    }
  )
}
  
  changeSize = (event) => {
    // this.setState({
    //   counters: new Array(parseInt(this.refs.countInput.value))
    //   .fill(0)
    //   .map(() => {
    //     return { number: 0, id: new Date().getTime + Math.random() };
    //   })
    // })
        
    this.props.dispatch(
      {
        type: "GENERATE_COUNTERS",
        payload: this.refs.countInput.value
      }
    )

    this.props.dispatch({
      type: "REINITSUM",
      payload: 0
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
    this.props.dispatch(
      {
        type: "INCREASE_ONE_COUNTER",
        payload: {changedNum, id}
      }
    )
    // const counters = this.state.counters.map(
    //   counterItem => {
    //     if(counterItem.id === id){
    //       return {number: counterItem.number + changedNum, id: id}
    //     } else {
    //       return counterItem
    //     }
    //   }
    // )
    // this.setState({counters: counters})
  }

  decreaseUpdate = (changedNum, id) => {
    this.props.dispatch(
      {
        type: "DECREASE_ONE_COUNTER",
        payload: {changedNum, id}
      }
    )
    // const counters = this.state.counters.map(
    //   counterItem => {
    //     if(counterItem.id === id){
    //       return {number: counterItem.number - changedNum, id: id}
    //     } else {
    //       return counterItem
    //     }
    //   }
    // )
    // this.setState({counters: counters})
  }

  render() {
    return (
      <div>
        {this.props.counterItems.map(counterItem => (
          <Counter 
          key={counterItem.id}
          id={counterItem.id}
          onUpdate={this.updateSum} 
          onIncrease={this.increaseUpdate} 
          onDecrease={this.decreaseUpdate} 
          counterNum={counterItem.number}/>
          )
        )}
        <input type="text" ref="countInput" value={this.props.inputField}/>
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
  counterSum: state.sum,
  inputField: state.inputField,
  counterItems: state.counterItems
}); 

connect(mapStateToProps)(CounterGroup)

export default connect(mapStateToProps)(CounterGroup) 