  const initialState = { 
    sum: 0
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "COUNTERSUM":
        return { sum: state.sum + action.payload };
      default:
        return state;
    }
  };