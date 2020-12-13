import "../../styles/styles.scss"
import {useGlobalState} from '../../config/store'    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'  


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
                return <div key={i} class="gift"> <li>{v}</li> <button index={i} class="deleteGift" onClick={deleteGift}>delete</button></div>
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

        <div id={identifer} class="styledBox d-flex align-items-center justify-content-center flex-column">   
        <div class="hole"></div>  
        <form class="d-flex flex-column align-items-center giftForm" onSubmit={addItem}>
        Name:   
        <input class="nameInput" type="text" id="name" name="name" required />
         
        {showItems()}
        List:   
        
        <input class="giftInput" type="text" name="addItem"></input>  
        <input class="giftSubmit" type="submit" name="makeList"  value="Save List"/>
        </form>  

        <div class="d-flex align-items-center my-2">  
       
        <div class="line"></div>
        <FontAwesomeIcon className="giftCardIcon" icon={faGift} />   
        <div class="line"></div> 
        
        </div>  
       
        </div>  

    )
}



export default List