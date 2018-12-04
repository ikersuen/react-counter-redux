  const initialState = { 
    inputField: '',
    sum: 0
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "REINITSUM_AND_CLEARFIELD":
        return { 
          inputField: state.inputField = action.payload, 
          sum: state.sum = 0
        }
      case "COUNTERSUM":
        return { sum: state.sum + action.payload }
      default:
        return state
    }
  };