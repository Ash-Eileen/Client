import "../styles/styles.scss"
import {useGlobalState} from '../config/store'    

const List = (props) =>{   

    const {store, dispatch} = useGlobalState() 
    const {giftLists} = store  
    const {identifer} = props  



//   deletes a selected gift and updates global state
const deleteGift = (event) =>{ 
    event.preventDefault()  
    
    giftLists[identifer].splice(event.target.getAttribute("index"),1)
     
     dispatch({ 
                type: "setGiftLists", 
                data: giftLists
            })  
  }   


//   displays gifts in list from global state
    const showItems = () => {   

        if ( (giftLists[identifer].length > 0 ) ) { 
            return giftLists[identifer].map((v,i)=>{ 
                return <div key={i}> <li>{v}</li> <button index={i} onClick={deleteGift}>delete</button></div>
            })
        }
    } 


// adds a gift to the global state
    const addItem = (event) => {    
        event.preventDefault()   

        if (giftLists[identifer]) {  

            giftLists[identifer].push(event.target.addItem.value)

              dispatch({ 
                type: "setGiftLists", 
                data: giftLists
            })    
            
        } 

    } 



    
    return(  
        <div id={identifer} class="styledBox">    
        
        <form onSubmit={addItem}>
        Name:   
        <input type="text" id="name" name="name" required />
        <br/>   
         
        {showItems()}
        List:   
        
        <input type="text" name="addItem"></input>  
        <input type="submit" name="makeList"  value="Save List"/>
        </form>

        </div> 

    )
}



export default List