export default function (state, action) {
    switch(action.type) {  
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        
        case "test": { 
            return { 
                ...state, 
                test: action.data
            }
        } 
        

        default: 
            return state
    }
}