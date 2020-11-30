import React, {useReducer, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'  
import stateReducer from './config/stateReducer'
import {StateContext} from './config/store'
import Login from "./components/login"  
import Home from "./components/Home" 
import SignUp from "./components/Register" 
import AboutUs from "./components/AboutUs" 
import LetterToSanta from "./components/LetterToSanta" 
import GiftList from "./components/GiftList" 
import AdventCalender from "./components/AdventCalender" 
import Nav from "./components/Nav"


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
          <Nav/>
          <Route exact path="/login" component={Login} />  
          <Route exact path="/signup" component={SignUp} />   
          <Route exact path="/about-us" component={AboutUs} /> 
          <Route exact path="/letter-to-santa" component={LetterToSanta} /> 
          <Route exact path="/gift-list" component={GiftList} /> 
          <Route exact path="/advent-calender" component={AdventCalender} /> 
          <Route exact path="/" component={Home} />  
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
