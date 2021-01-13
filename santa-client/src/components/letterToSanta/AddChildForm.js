import { v4 as uuidv4 } from "uuid"; 
import { useGlobalState } from "../../config/store"; 



const AddChildForm = () => {  

    const { store, dispatch } = useGlobalState();
    const { letterToSanta } = store;

    const addChild = (event) =>{ 
        event.preventDefault() 
  
        letterToSanta.addForm = false; 
  
        console.log(event.target.childAge.value) 
  
        let child = { 
            name: event.target.childName.value, 
            age: event.target.childAge.value,
            uid: uuidv4(), 
            list:[] 

        } 
  
        letterToSanta.children.push(child)
  
        dispatch({
          type: "setLetterToSanta",
          data: letterToSanta,
        });  
  
        console.log(letterToSanta.children)   
    } 

  return (
    <div>
      <form onSubmit={addChild}>
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
