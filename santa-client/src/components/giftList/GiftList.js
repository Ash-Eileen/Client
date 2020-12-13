import List from "./List"    
import {useGlobalState} from '../../config/store'  
import { v4 as uuidv4 } from 'uuid';
import ChristmasButton from "../ChristmasButton";






const GiftList = (props) =>{     

    const {store,dispatch} = useGlobalState() 
    const {giftLists} = store   

    let randomId = uuidv4() 

    const addList = (event) =>{  
        
        
            // EDIT STATE PROPERLY, COME BACK!!!!
        
        
        event.preventDefault()   
         
        giftLists[randomId] = [] 

        dispatch ({ 
            type:"setGiftLists", 
            data: giftLists
        }) 

        console.log(giftLists)
    }   

    const deleteList = (event) =>{  
        event.preventDefault()     

        delete giftLists[event.target.id]
        
        dispatch({  
            type:"setGiftLists", 
            data: giftLists
        }) 

        console.log(giftLists)
    }

    return(  
        <div> 
            <h1 class="giftListHeader">Gift List</h1> 

            <ChristmasButton onClick={addList} text="Add Gift List"/> 
            
            <div>    
                
                {Object.keys(giftLists).length > 0 && Object.keys(giftLists).map((v, i) => {  
                    // return <div><List identifer={v}/><button id={v} class="deleteList" onClick={deleteList}>Delete List</button> </div>  
                    return <div><List identifer={v}/><ChristmasButton id={v}  text="Delete List" onClick={deleteList} className="deleteList" /> </div> 
        
                    })}
                
            </div>  
            
        </div>
    )
}



export default GiftList