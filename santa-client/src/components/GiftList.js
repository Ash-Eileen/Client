import List from "./List"   





const GiftList = (props) =>{    

    const addList = () =>{  
        // add stuff from inuts 
    }

    return(  
        <div> 
            <h1>GiftList</h1> 

            <a onClick={addList}>add person</a> 
            <div>  
                <List  
                name= "ye" 
                items = "BETTER"
                />

            </div>  
            
        </div>
    )
}



export default GiftList