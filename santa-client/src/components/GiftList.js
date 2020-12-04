import List from "./List"    
import {useGlobalState} from '../config/store' 






const GiftList = (props) =>{     

    const {store,dispatch} = useGlobalState() 
    const {giftLists} = store  
    

    const addList = (event) =>{  
        
        
            // EDIT STATE PROPERLY, COME BACK!!!!
        
        
        event.preventDefault()   
        

        // let person = {} 
        // person[ranNum] = []   
        
        // let giftListsCopy = {...giftLists, person}  

        giftLists[Object.keys(giftLists).length] = []
        // console.log(giftListsCopy)

        // console.log(Object.keys(giftLists))

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

// delete Object.keys(giftLists)[1] 

// list : remove a specific index position from the list array
// giftList : remove all the fields in the giftList state that corresponds to a particular person

    return(  
        <div> 
            <h1>GiftList</h1> 

            <button onClick={addList}>Add Gift List</button> 
            
            <div>    
                {/* <List /> 
                <button onClick={deleteList}>Delete List</button>  */}
                
                {Object.keys(giftLists).length > 0 && Object.keys(giftLists).map((v, i) => {  
                    // return <div><List identifer={v}/>,<button id={v} onClick={deleteList}>Delete List</button> </div> 
                    return <div><List identifer={v}/>,<button id={v} onClick={deleteList}>Delete List</button> </div>
                    })}
                
            </div>  
            
        </div>
    )
}



export default GiftList