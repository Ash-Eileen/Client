

export default function (state, action) {
    switch(action.type) {  
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }  

        case "setGiftLists": {  
            return { 
                ...state, 
                giftLists: action.data
            }
        }
        default: 
            return state
    }
}