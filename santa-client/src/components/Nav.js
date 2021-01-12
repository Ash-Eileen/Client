import React from 'react'
import {Link} from 'react-router-dom' 
import {useGlobalState} from '../config/store' 
import {logoutUser} from "../services/authServices" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSleigh,faCandyCane } from '@fortawesome/free-solid-svg-icons'  
import ChristmasButton from "./ChristmasButton"
import "../styles/pages/nav.scss" 


const Nav = () =>{  
 
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store  

    const logout = (event) =>{ 
        logoutUser(loggedInUser) 
        .then(()=>{  
             dispatch({
            type: "setLoggedInUser",
            data: null
            })  
        }) 
        .catch((err)=>{ 
            console.log(err)
        })
    }


    return(  
    <div class="row mt-2"> 

    <div class="col"> 

     <Link to="/">
     <div class="d-flex flex-column align-items-center">   
    <FontAwesomeIcon className="logo" icon={faSleigh} />  
    <p class="m-0 logoText">North Pole Post</p>
    </div>  
    </Link>

    </div>
    <div class="col d-flex align-items-center justify-content-center">
      <Link className="navOption" to="/about-us">About Us</Link> 

    <div class="nav-item dropdown">
    <a class="nav-link dropdown-toggle navOption" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Activities
    </a>
        
    <div class="dropdown-menu navOption dropDownMenu" aria-labelledby="navbarDropdown">
      <Link className="dropdown-item dropDownOption" to="/gift-list">Gift List</Link> 
      <Link className="dropdown-item dropDownOption" to="/advent-calender">Advent Calender</Link>  
      <Link className="dropdown-item dropDownOption" to="/Letter-to-Santa">Letter to Santa</Link>
      <Link className="dropdown-item dropDownOption" to="/">Secret Santa</Link>
    </div>   
    
    </div>
    
    </div> 


    <div class="col d-flex align-items-center justify-content-center">
       <div class="logDiv">  

        {loggedInUser ? <ChristmasButton className="log" to="/login" text="logout" icon={faCandyCane} onClick={logout}/> : <ChristmasButton className="log" icon={faCandyCane} to="/login" text="Login"/> }  

        </div> 
    </div>
  </div> 

  
    )
}

export default Nav 
