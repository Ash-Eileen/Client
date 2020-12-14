import "../../styles/pages/giftCards.scss"
import {useGlobalState} from '../../config/store'    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import styled from 'styled-components'



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

     const deleteButton = styled.a` 
 display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white; 
  
  :hover { 
  background-color:blue;
    }
    `;    

    const styledP = styled.p`font-size:20rem`;


//   displays gifts in list from global state
    const showItems = () => {  

        console.log(giftLists.[identifer])  

        if ( (giftLists[identifer].length > 0) ) { 
            return giftLists[identifer].map((v,i)=>{ 
                return ( 
                <div key={i} class="gift col d-flex m-0 justify-content-center my-2">  
                
                <li>{v}</li>  
                <button index={i} style={{backgroundColor: `${giftLists[identifer].color}`}} class="deleteGift cardButton" onClick={deleteGift}>delete</button>   
                <deleteButton>Delete</deleteButton>
                </div> 
                )
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

    const meColor = (event) => { 

        giftLists[identifer].color = event.target.value

        dispatch ({ 
             type: "setGiftLists", 
            data: giftLists

        })
    } 

    let cardStyle = "d-flex align-items-center justify-content-center flex-column" + ` ${giftLists[identifer].cardShape}`
    
 
 

    return(   

        <div id={identifer} style={{backgroundColor: `${giftLists[identifer].color}`}} class={cardStyle}>   
        <div class="hole"></div>  
        <form  class="d-flex flex-column align-items-center giftForm" onSubmit={addItem}>
        Name:   
        <input class="nameInput" type="text" id="name" name="name" required />
         
        <div class="row row-cols-2"> 

        {showItems()}   

        </div>
        
        List:    
        <styledP>hi</styledP>
        
        <input class="giftInput" type="text" name="addItem"></input> 

        <input type="color" list="presetColors" value={giftLists[identifer].color} onChange={meColor}/>  
        <datalist id="presetColors"> 
            <option>#ff857a</option>/>
            <option>#e9ae81</option>
            <option>#e9e481</option>  
            <option>#b7e981</option>  
            <option>#85e981</option> 
            <option>#81e9c1</option> 
            <option>#81dee9</option> 
            <option>#819be9</option>  
            <option>#9d81e9</option>  
            <option>#e981e9</option>  
            <option>#e98193</option> 
        </datalist>

        <input class="giftSubmit" type="submit" name="makeList"  value="Save List"/>
        </form>  

        <div class="d-flex align-items-center my-2">  

       
        <div class="line"></div>
        <FontAwesomeIcon className="giftCardIcon" icon={giftLists[identifer].icon} />   
        <div class="line"></div> 
        
        </div>  
       
        </div>  

    )
}



export default List