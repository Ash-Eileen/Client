import {Link} from 'react-router-dom'   

import "../styles/pages/christmasButton.scss" 

const ChristmasButton = (props) =>{  

    return(  
        <div>
          {props.onClick ? <div onClick={props.onClick} class="christmasButton py-1 px-3">{props.text}</div> : <Link to={props.to}><div class="christmasButton py-1 px-3"><p>{props.text}</p></div></Link>}
        </div>
    )
}



export default ChristmasButton