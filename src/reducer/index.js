  const initialState = { 
    sum: 0,
    counterItems: []
  };

  const generate_id = () => { return new Date().getTime + Math.random()};
  
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "REINITSUM":
        return { ...state, sum: 0 }
      case "COUNTERSUM":
        return { ...state, sum: state.sum + action.payload }
      case "GENERATE_COUNTERS":
        return {...state,
          counterItems: new Array(parseInt(action.payload))
                .fill(0)
                .map(() => {return { number: 0, id: generate_id()}})
        }
      case "INCREASE_ONE_COUNTER":
      const counterItemsIncrease = state.counterItems.map(
        counterItem => {
          if(counterItem.id === action.payload.id){
            return {number: counterItem.number + action.payload.changedNum, id: counterItem.id}
          } else {
            return counterItem 
          }
        }
      )
      return { ...state, counterItems: counterItemsIncrease}
      case "DECREASE_ONE_COUNTER":
      const counterItemsDecrease = state.counterItems.map(
        counterItem => {
          if(counterItem.id === action.payload.id){
            return {number: counterItem.number - action.payload.changedNum, id: counterItem.id}
          } else {
            return counterItem
          }
        }
      )
      return { ...state, counterItems: counterItemsDecrease}
      default:
        return state
    }
  };