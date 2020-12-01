import List from "./List"    
import React, {useState} from 'react' 
import {useGlobalState} from '../config/store' 







const GiftList = (props) =>{     

    const {store} = useGlobalState() 
    const {giftLists} = store  
    
    const [listsCount,setListsCount] = useState([0]) 


     
    const addList = (event) =>{  
        event.preventDefault()    
        setListsCount([...listsCount, 1] ) 
        console.log(listsCount) 
    } 



    return(  
        <div> 
            <h1>GiftList</h1> 

            <button onClick={addList}>add person</button> 
            
            <div>   
                {listsCount.map((thing) => { return <List/>})}
                
            </div>  
            
        </div>
    )
}



export default GiftList