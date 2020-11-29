export default function (state, action) {
    switch(action.type) { 
        
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