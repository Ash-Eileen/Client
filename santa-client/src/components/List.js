import "../styles/styles.scss"
import {useGlobalState} from '../config/store'   
import React, {useState} from 'react' 

 

const List = (props) =>{   

    const {store, dispatch} = useGlobalState() 
    const {giftLists} = store  

    const [formName,setFormName] = useState("name")  

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

//   displays items in giftLists 
// (Object.keys(giftLists).length !== 0)
    const showItems = () => {   
        // console.log(giftLists[formName], formName)
        // if ( (giftLists[identifer]) && (identifer !== "name" || identifer !== "") ) { 
        //     return giftLists[document.getElementById(identifer).value].map((v,i)=>{ 
        //         return <div key={i}> <li>{v}</li> <button index={i} onClick={deleteGift}>delete</button></div>
        //     })
        // } 

        if ( (giftLists[identifer].length > 0 ) ) { 
            return giftLists[identifer].map((v,i)=>{ 
                return <div key={i}> <li>{v}</li> <button index={i} onClick={deleteGift}>delete</button></div>
            })
        }
    } 

//    adds items to list via update of global state and saves list
    const addItem = (event) => {    
        event.preventDefault()  

        // let name = event.target.name.value

        if (giftLists[identifer]) {  
            
            // let newId = `${identifer + event.target.name.value}`

            // giftLists[identifer + event.target.name.value] = giftLists[identifer];
            //  delete giftLists[ identifer ];   
             
            //  console.log(newId)

            //  dispatch({ 
            //     type: "setGiftLists", 
            //     data: giftLists
            // })   

             

            // giftLists[identifer + event.target.addItem.value].push(event.target.addItem.value) 


            giftLists[identifer].push(event.target.addItem.value)


              dispatch({ 
                type: "setGiftLists", 
                data: giftLists
            })    
            
        } 
            
        // } else {   
        //     let giftListCopy = {...giftLists, [name]: [event.target.addItem.value]}  

        //        dispatch({
        //         type: "setGiftLists", 
        //         data: giftListCopy
        //     })    
        
        //     document.getElementById(formName).setAttribute("id", `${name}`)   
        //     setFormName(name) 

        // }    

        // document.getElementById(formName).setAttribute("id", `${name}`)   
        //  setFormName(name) 
    } 



    
    return(  
        <div id={identifer} class="styledBox">    
        
        <form onSubmit={addItem}>
        Name:   
        <input type="text" id="name" name="name" required />
        {/* {formName == "name" ? <input type="text" id="name" name="name" /> : <h4 id={formName}>{formName}</h4>} */}
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