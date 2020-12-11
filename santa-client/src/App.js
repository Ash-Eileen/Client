import React, {useReducer, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'  
import stateReducer from './config/stateReducer'
import {StateContext} from './config/store'
import Login from "./components/login"  
import Home from "./components/Home" 
import SignUp from "./components/Register" 
import AboutUs from "./components/AboutUs" 
import LetterToSanta from "./components/LetterToSanta" 
import GiftList from "./components/giftList/GiftList" 
import AdventCalender from "./components/AdventCalender" 
import Nav from "./components/Nav" 
import SocialsBar from "./components/SocialsBar"; 
import "./styles/partials/cane.scss"




function App() {   

  const initialState = { 
    giftLists: {}
  }

  const [store, dispatch] = useReducer(stateReducer,initialState)


  return ( 
    <div>   
    
      <StateContext.Provider value={{store,dispatch}}>
        <BrowserRouter>  
          
          
          <div class="allPageContainer"> 

            <div class="row p-0 m-0 d-flex justify-content-center"> 
              
              <div class="col-1 p-0"> 
              <div class="leftCane"></div> 
              </div>  

              <div class="col-10 p-0">  
              <Nav/>   

              <div class="d-flex flex-column align-items-center text-center">
              <Route exact path="/login" component={Login} />  
              <Route exact path="/signup" component={SignUp} />   
              <Route exact path="/about-us" component={AboutUs} /> 
              <Route exact path="/letter-to-santa" component={LetterToSanta} /> 
              <Route exact path="/gift-list" component={GiftList} /> 
              <Route exact path="/advent-calender" component={AdventCalender} /> 
              <Route exact path="/" component={Home} />  
              </div> 
<SocialsBar/>
              </div>   
             
              
              <div class="col-1 p-0"> 
              <div class="rightCane"></div>  
              </div>  
            </div> 
            
          </div>   

        </BrowserRouter>
      </StateContext.Provider>  
      </div>  
      
    
  );
}

export default App; 
