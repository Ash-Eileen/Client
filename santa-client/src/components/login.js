import React, {useState} from 'react'
import {useGlobalState} from '../config/store' 
import {loginUser} from "../services/authServices"

const Login = ({history}) =>{  
    
    const initialFormState = {
        username: "",
        password: ""
    }

    const [userDetails,setUserDetails] = useState(initialFormState) 
    
    const [errors,setErrors] = useState([])

    const {dispatch,store} = useGlobalState()  

    const detailsChange = (event) =>{ 
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const loginSubmit = (event) =>{ 
      event.preventDefault()    
            
      loginUser(userDetails) 
      .then((data) =>{  
        //   console.log(data._id) 
          console.log(data)
          dispatch({ 
              type: "setLoggedInUser", 
              data: data._id
          })  
          console.log(userDetails)
          history.push("/") 
      }) 
      .catch((error) => {       
          console.log(error)
          setErrors([1])  
    })	
    }

    return( 
        <div> 
            <h1>Login</h1> 

     
<h5 class="errors">{errors.length > 0 ? "Invalid Credentials" : ""}</h5>
            <form class="login" onSubmit={loginSubmit}>
            <div>
                <label>Username</label>
                <input required class="username" type="text" name="username" placeholder="Enter a username" onChange={detailsChange}></input>
            </div>
            <div>
                <label>Password</label>
                <input required class="password" type="password" name="password" placeholder="Enter a password" onChange={detailsChange}></input>
            </div>
            <input type="submit" value="Login"></input>
            
        </form>
        </div>
    )
}



export default Login