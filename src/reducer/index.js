  const initialState = { 
    sum: 0
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "COUNTERSUM":
        return { sum: state.sum + action.payload }
      case "REINITSUM":
        return { sum: state.sum = 0}
      default:
        return state
    }
  };