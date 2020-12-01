import "../styles/styles.scss" 
import {useGlobalState} from '../config/store'   
import React, {useState} from 'react' 

 

const List = (props) =>{   

    const {store, dispatch} = useGlobalState() 
    const {giftLists} = store  

    const [formName,setFormName] = useState("name") 

  const deleteGift = (event) =>{ 
    event.preventDefault()  
    
    giftLists[formName].splice(event.target.getAttribute("index"),1)
     
     dispatch({ 
                type: "setGiftLists", 
                data: giftLists
            })  
  }

    const showItems = () => {  
        if (formName != "name") { 
            return giftLists[document.getElementById(formName).value].map((v,i)=>{ 
                return <div key={i}> <li>{v}</li> <button index={i} onClick={deleteGift}>delete</button></div>
            })
        }
    }

    
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
            // giftLists[name] = [event.target.addItem.value]  
            // giftLists[name]: [event.target.addItem.value
            let giftListCopy = {...giftLists, [name]: [event.target.addItem.value]}  


               dispatch({
                type: "setGiftLists", 
                data: giftListCopy
            })   
        }    
 

         
       
        document.getElementById(formName).setAttribute("id", `${name}`)   
         setFormName(name) 
         console.log(formName)
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