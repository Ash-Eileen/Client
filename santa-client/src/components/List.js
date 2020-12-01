import "../styles/styles.scss" 
// import {useGlobalState} from '../config/store'  
import stateReducer from '../config/stateReducer' 
import React, {useReducer} from 'react'  
 

const List = (props) =>{   

  const initialState = {
    giftLists: {}
  }

  const [store, dispatch] = useReducer(stateReducer,initialState)
  const {giftLists} = store  

  const deleteGift = (event) =>{ 
    event.preventDefault()  
    // console.log(event.target.getAttribute("index"))  
    giftLists[document.getElementById("name").value].splice(event.target.getAttribute("index"),1)
     
     dispatch({ 
                type: "setGiftLists", 
                data: giftLists
            })  
  }

    const showItems = () => {  
        if (document.getElementById("name")) { 
            return giftLists[document.getElementById("name").value].map((v,i)=>{ 
                return <div> <li key={i}>{v}</li> <button index={i} onClick={deleteGift}>delete</button></div>
            })
        }
    }

    
    const addItem = (event) => {    
        event.preventDefault()  

        let name = event.target.name.value 
        

        if (giftLists[name]) {  
            giftLists[name].push(event.target.addItem.value)

              dispatch({ 
                type: "setGiftLists", 
                data: giftLists
            })  
            
        } else {   
            giftLists[name] = [event.target.addItem.value] 
               dispatch({
                type: "setGiftLists", 
                data: giftLists
            })  
        }      

        event.target.setAttribute("id", `${name}`)  
        console.log(event.target)

    }

    
    return(  
        <div class="styledBox">    


        {/* onsubmit of form give it an id with name */}
        
        <form onSubmit={addItem}>
        Name:<input type="text" id="name" name="name" /> 
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