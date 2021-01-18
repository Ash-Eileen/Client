import { v4 as uuidv4 } from "uuid"; 
import { useGlobalState } from "../../config/store";  
import { addChildDB } from "../../services/childGiftListServices"; 
import "../../styles/pages/letterToSanta.scss"





const AddChildForm = () => {  

    const { store, dispatch } = useGlobalState();
    const { letterToSanta, loggedInUser } = store;

    const addChild = (event) =>{ 
        event.preventDefault() 
  
        letterToSanta.addForm = false; 
  
        console.log(event.target.childAge.value)  

        const childUid = uuidv4()
  
        let child = { 
            name: event.target.childName.value, 
            age: event.target.childAge.value,
            uid: childUid, 
            list:[] 
        } 
  
        letterToSanta.children.push(child) 

        let childToExpress = {  
            name: event.target.childName.value, 
            age: event.target.childAge.value,
            childUid: childUid
        }  

        console.log(childToExpress)  
        console.log(loggedInUser)

        addChildDB(loggedInUser, childToExpress) 
        .then(()=>{  
          dispatch({
            type: "setLetterToSanta",
            data: letterToSanta,
          });  
        }) 
        .catch(console.log)
  
       
      } 

  return (
    <div>
      <form onSubmit={addChild} class="d-flex flex-column justify-content-center align-items-center">
        <label>Name</label>
        <input required type="text" name="childName" placeholder="Name"></input>

        <label>Age</label>
        <input required type="text" name="childAge" placeholder="Age"></input>

        <input
          class="christmasInputButton m-2"
          type="submit"
          value="Submit"
        ></input>
      </form>
    </div>
  );
};

export default AddChildForm;
