import api from "../config/api"

const loginUser = async(userData) => {  
    const response = await api.post("/auth/login", userData) 
    console.log("got user back from server", response) 
    return response.data
} 

const logoutUser = async(userData) => {  
    const response = await api.get("/auth/logout") 
    console.log("got user back from server", response) 
    return response.data

} 

const registerUser = async(userData) => {  
const response = await api.post("/auth/register", userData) 
console.log("registerd user", response)  
return response.data
}

export{ 
    loginUser, 
    logoutUser, 
    registerUser
}