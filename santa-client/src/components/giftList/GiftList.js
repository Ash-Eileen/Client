import List from "./List"    
import {useGlobalState} from '../../config/store'  
import { v4 as uuidv4 } from 'uuid';
import ChristmasButton from "../ChristmasButton";  
import { faGift, faSnowflake, faStar, faHollyBerry } from '@fortawesome/free-solid-svg-icons'   
import "../../styles/styles.scss"







const GiftList = (props) =>{     

    const {store,dispatch} = useGlobalState() 
    const {giftLists} = store   

    let randomId = uuidv4()  

    const addList = (event) =>{   
        
        event.preventDefault()   
         
        giftLists[randomId] = []  

        const boxStyles = ["styledBoxTrapez", "styledBoxSquare","styledBoxPentagon"] 
        const randNumBox = Math.floor(Math.random() * 3)   

        giftLists.[randomId].cardShape = boxStyles[randNumBox]  

        const icons = [faGift,faHollyBerry,faSnowflake,faStar] 
        const randNumIcons = Math.floor(Math.random() * 4) 

        giftLists.[randomId].icon = icons[randNumIcons]   

          const colors = ["#e99481", "#e9ae81", "#e9e481"  , "#b7e981"  , "#85e981" , "#81e9c1" , "#81dee9" , "#819be9"  , "#9d81e9"  , "#e981e9"  , "#e98193"]  
          const randNumColors = Math.floor(Math.random() * colors.length) 


        giftLists[randomId].color = colors[randNumColors]

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

    return(  
        <div>  

            <div class="headerButton">
            <h1 class="giftListHeader">Gift List</h1> 
          
            <div class="d-flex m-3">
            <ChristmasButton onClick={addList} text="Add Gift List"/>  
            </div> 

            </div> 

            <div class="row row-cols-3 d-flex justify-content-around">     
                
                {Object.keys(giftLists).length > 0 && Object.keys(giftLists).map((v, i) => {    
                    return ( 
                    <div>  

                    <div class="col my-3 d-flex flex-column align-items-center">
                    <List identifer={v} />  
                    <div class="my-3" onClick={deleteList}>  
                    <ChristmasButton id={v} text="Delete List" onClick={deleteList} className="deleteList" />   
                    </div>
                    </div>  

                    </div>) 
        
                    })} 
                 
            </div>  
            
        </div>
    )
}



export default GiftList