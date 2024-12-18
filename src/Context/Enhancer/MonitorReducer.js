// const roundToTwoDecimalPlaces = (number) => Math.round(number * 100) / 100;

// const MonitorReducerEnhancer =
//   (createStore) => (reducer, preloadedState, enhancer) => {
//     const monitoredReducer = (state, action) => {
//       const startTime = performance.now();
//       const newState = reducer(state, action);
//       const endTime = performance.now();

//       const duration = roundToTwoDecimalPlaces(endTime - startTime);
//       console.log("Reducer process time:", duration, "ms");

//       return newState;
//     };

//     // Function to retrieve preloaded state from localStorage
//     const getPreloadedState = () => {
//       try {
//         const storedState = localStorage.getItem("auth");
//         if (storedState) {
//           const parsedState = JSON.parse(storedState);
//           console.log("Stored data after reload:", parsedState);
//           return parsedState;
//         }
//         return undefined;
//       } catch (error) {
//         console.warn("Error retrieving state from localStorage:", error);
//         return undefined;
//       }
//     };

//     // Use the getPreloadedState function to set the initial state
//     const initialState = preloadedState || getPreloadedState();

//     return createStore(monitoredReducer, initialState, enhancer);
//   };

// export default MonitorReducerEnhancer;
const roundToTwoDecimalPlaces = (number) => Math.round(number * 100) / 100;

const MonitorReducerEnhancer = (createStore) => (reducer, preloadedState, enhancer) => {
  // Function to retrieve preloaded state from localStorage
  const getPreloadedState = () => {
    try {
      const storedState = localStorage.getItem("auth");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        console.log("Stored data after reload:", parsedState);
        return parsedState;
      }
    } catch (error) {
      console.warn("Error retrieving state from localStorage:", error);
    }
    return undefined;
  };

  // Use the getPreloadedState function to set the initial state
  const initialState = preloadedState || getPreloadedState();

  const monitoredReducer = (state, action) => {
    const startTime = performance.now();
    const newState = reducer(state, action); // Call the original reducer
    const endTime = performance.now();

    const duration = roundToTwoDecimalPlaces(endTime - startTime);
    console.log("Reducer process time:", duration, "ms");

    return newState; // Return the new state
  };

  return createStore(monitoredReducer, initialState, enhancer);
};

export default MonitorReducerEnhancer;