import React from 'react'
import {Link} from 'react-router-dom' 
import {useGlobalState} from '../config/store' 
import {logoutUser} from "../services/authServices"

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
        <div class="d-flex align-items-center">  
        <Link to="/about-us">About Us</Link>   
        
        <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Activities
        </a>
        
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/gift-list">Gift List</Link> 
          <Link className="dropdown-item" to="/advent-calender">Advent Calender</Link>  
          <Link className="dropdown-item" to="/Letter-to-Santa">Letter to Santa</Link>
          <Link className="dropdown-item" to="/">Secret Santa</Link>
        </div>   
        </div> 

        <div>
        {loggedInUser ? <a class="log" onClick={logout}>Logout</a> : <Link className="log" to="/login">Login</Link> }  
        </div> 
        


        </div>
    )
}

export default Nav 
