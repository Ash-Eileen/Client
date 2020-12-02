import "../styles/styles.scss"
import {useGlobalState} from '../config/store'   
import React, {useState} from 'react' 

 

const List = (props) =>{   

    const {store, dispatch} = useGlobalState() 
    const {giftLists} = store  

    const [formName,setFormName] = useState("name") 

    //   console.log(props.index)
//   deletes a selected gift and updates global state
  const deleteGift = (event) =>{ 
    event.preventDefault()  
    
    giftLists[formName].splice(event.target.getAttribute("index"),1)
     
     dispatch({ 
                type: "setGiftLists", 
                data: giftLists
            })  
  }   

//   on click function deletes a whole list from global state
  const deleteListFromGlobal = (event) =>{ 
      event.preventDefault()    
      console.log(giftLists)

      delete giftLists[formName]
   
      dispatch({
                type: "setGiftLists", 
                data: giftLists
            })    

            // console.log(giftLists)
  } 

//   checks if list has been created, if so enables the deleteListFromGlobal functionality
  const deleteList = () => {  
    return formName !== "name" ? <button onClick={deleteListFromGlobal}>delete</button> : ""
  } 

//   displays items in giftLists 
// (Object.keys(giftLists).length !== 0)
    const showItems = () => {   
        console.log(giftLists[formName], formName)
        if ( (giftLists[formName]) && (formName !== "name" || formName !== "") ) { 
            return giftLists[document.getElementById(formName).value].map((v,i)=>{ 
                return <div key={i}> <li>{v}</li> <button index={i} onClick={deleteGift}>delete</button></div>
            })
        }
    } 

//    adds items to list via update of global state and saves list
    const addItem = (event) => {    
        event.preventDefault()  

        let name = event.target.name.value

        if (giftLists[name]) {  
            giftLists[name].push(event.target.addItem.value)
            // let giftListCopy = {...giftLists, [name].push(event.target.addItem.value)}

              dispatch({ 
                type: "setGiftLists", 
                data: giftLists
            })    
            
        } else {   
            let giftListCopy = {...giftLists, [name]: [event.target.addItem.value]}  

               dispatch({
                type: "setGiftLists", 
                data: giftListCopy
            })    
        
            document.getElementById(formName).setAttribute("id", `${name}`)   
            setFormName(name) 

        }    

        // document.getElementById(formName).setAttribute("id", `${name}`)   
        //  setFormName(name) 
    }

    
    return(  
        <div class="styledBox" id={props.index}>    
        
        <form onSubmit={addItem}>
        Name:   
        <input type="text" id="name" name="name" required />
        {/* {formName == "name" ? <input type="text" id="name" name="name" /> : <h4 id={formName}>{formName}</h4>} */}
        <br/>   
        {deleteList()}
         
        {showItems()}
        List:   
        
        <input type="text" name="addItem"></input>  
        <input type="submit" name="makeList"  value="Save List"/>
        </form>

        </div> 

    )
}



export default List