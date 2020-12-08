import {registerUser} from "../services/authServices" 
import {useGlobalState} from '../config/store'  
import React, {useState} from 'react'



const SignUp = ({history}) =>{  
    
    const initialFormState = {
        username: "", 
        email: "",
        password: ""
    }

    const [userDetails,setUserDetails] = useState(initialFormState)
    const {dispatch} = useGlobalState() 

    const detailsChange = (event) =>{ 
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const signUpSubmit = (event) =>{ 
        event.preventDefault()    
        
        console.log(userDetails)
        
        registerUser(userDetails) 
        .then(()=>{ 
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.push("/")
        }) 
        .catch((err) => { 
            console.log(`Error : ${err}`) 
        })
      }

    return(  
        <div> 
            <h1 class="signupHeading">Sign Up</h1> 

            <form class="signup" onSubmit={signUpSubmit}>
            <div>
                <label>Username</label>
                <input class="username" required type="text" name="username" placeholder="Enter a username" onChange={detailsChange}></input>
            </div> 

            <div>
                <label>Email</label>
                <input class="email" required type="Email" name="email" placeholder="Enter your Email" onChange={detailsChange}></input>
            </div>

            <div>
                <label>Password</label>
                <input class="password" required type="password" name="password" placeholder="Enter a password" onChange={detailsChange}></input>
            </div>
            <input type="submit" value="Sign Up"></input>
            
        </form>
        </div>
    )
}



export default SignUp