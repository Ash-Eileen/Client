import React, {useReducer, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'  
import stateReducer from './config/stateReducer'
import {StateContext} from './config/store'
import Login from "./components/login" 


function App() {   

  const initialState = {
    test: "test"
  }

  const [store, dispatch] = useReducer(stateReducer,initialState)


  return (
    <div> 
      <StateContext.Provider value={{store,dispatch}}>
        <BrowserRouter>
          <h1>Santa</h1>
          <Route exact path="/login" component={Login} />
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
