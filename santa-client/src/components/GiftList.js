import List from "./List"    
import {useGlobalState} from '../config/store' 







const GiftList = (props) =>{     

    const {store,dispatch} = useGlobalState() 
    const {giftLists} = store   


    const addList = (event) =>{  
        event.preventDefault() 
        console.log("hi")   
        return <List/>
    }  



    return(  
        <div> 
            <h1>GiftList</h1> 

            <button onClick={addList}>add person</button> 
            
            <div>    
                <List/>
                {/* {Object.keys(giftLists).map((v, i) => {  
                    // console.log("mapping lists " + v)  
                    return <List index={i + "list"}/>  
                    })} */}
                
            </div>  
            
        </div>
    )
}



export default GiftList