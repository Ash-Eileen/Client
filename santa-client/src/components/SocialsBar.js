import React from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faGithubSquare} from '@fortawesome/free-brands-svg-icons'  
import "../styles/pages/socials.scss"

const SocialsBar = () => {
    return (
        <div> 
        <div class="d-flex">   
            <FontAwesomeIcon className="social" icon={faFacebookSquare} />    
            <FontAwesomeIcon className="social" icon={faInstagramSquare} />   
            <FontAwesomeIcon  className="social"icon={faGithubSquare} />    
        </div>
            
        </div>
    )
}

export default SocialsBar
