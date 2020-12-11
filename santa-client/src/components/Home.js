import "../styles/pages/home.scss" 
import {Link} from 'react-router-dom' 


const Home = () =>{  

    return(  
        <div>  
        
        
        <h1>North Pole Post</h1>   
        
        <div class="timer"> 
        <h4> Time Till Christmas</h4> 
        <h5>1D 5Hrs 3Mins</h5> 
        </div>


    <div class="row p-0 m-0">   

    <div class="col p-0 m-0"> 
    
    <div class="row row-cols-2 p-0 m-0">   
    <Link to="/" className="activity">
    <div class="col"> 
    <div class="d-flex flex-column"> 
    <h5 class="center-fix">Secret Santa</h5> 
    <img class="present" src={window.location.origin + '/images/present4.jpg'} alt="presemt" /> 
    </div> 
    </div>
    </Link> 

    <div class="col"></div>
    <div class="col"></div>
    
    <Link to="/gift-list" className="activity">
    <div class="col"> 
    <div class="d-flex flex-column"> 
    <h5 class="center-fix">Gift List</h5> 
    <img class="present" src={window.location.origin + '/images/present4.jpg'} alt="presemt" /> 
    </div> 
    </div>   
    </Link>
    
    </div> 
    
    </div>
    
    
    <div class="col p-0 m-0"> 

    <img class="tree" alt="Christmas Tree" src={window.location.origin + '/images/tree.png'} />  

    </div>
    
    
    <div class="col p-0 m-0">   
    
    <div class="row row-cols-2 p-0 m-0">   
    
    <div class="col"></div>
    
    <Link to="/advent-calender" className="activity">
    <div class="col"> 
    <div class="d-flex flex-column"> 
    <h5 class="center-fix">Advent Calender</h5> 
    <img class="present" src={window.location.origin + '/images/present4.jpg'} alt="presemt" /> 
    </div> 
    </div>
    </Link>
    
    <Link to="/Letter-to-Santa" className="activity">
    <div class="col"> 
    <div class="d-flex flex-column"> 
    <h5 class="center-fix">Letter To Santa</h5> 
    <img class="present" src={window.location.origin + '/images/present4.jpg'} alt="presemt" /> 
    </div> 
    </div> 
    </Link>
    
    <div class="col"></div>  
      
    </div> 

    </div>  

    </div>


        </div>
    )
}



export default Home