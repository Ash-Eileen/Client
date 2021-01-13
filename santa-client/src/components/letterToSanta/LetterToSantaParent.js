import { useGlobalState } from "../../config/store";
import AddChildForm from "./AddChildForm"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

const LetterToSantaParent = () => {
  const { store, dispatch } = useGlobalState();
  const { letterToSanta } = store;

  // makes a form to be filled out with child details
  // cannot make another form if there already is another
  // prompts user to fill out existing form
  const addChildForm = (event) => {
    event.preventDefault();

    letterToSanta.addForm = true;

    dispatch({
      type: "setLetterToSanta",
      data: letterToSanta,
    });
  };

  const createList = (event) => {
    event.preventDefault();

    letterToSanta.parentMode = false;

    letterToSanta.currentChild = event.target.getAttribute("uid");

    dispatch({
      type: "setLetterToSanta",
      data: letterToSanta,
    });
  };

  const viewList = (event) => {
    event.preventDefault();
    console.log(event.target.getAttribute("uid"));
  };

  return (
    <div>
      <h1>Parent Mode</h1>

      <h3>How it works?</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus urna
        magna, a luctus arcu dignissim at. Sed et lacus in urna auctor egestas.
        Mauris mollis mauris ut augue tempor iaculis. Curabitur vitae erat urna.
        Vivamus tristique cursus lacinia.
      </p>

      <h3>Manage Children</h3>
      <div class="childrenDiv">
        {letterToSanta.children.length > 0 ? (
          letterToSanta.children.map((v, i) => { 

            const popover = (
                <Popover id="v">
                  <Popover.Title as="h3">{v.name}'s List</Popover.Title>
                  <Popover.Content> 
                      {v.list.map((gift,i)=>{  
                          return( 
                              <li>gift</li>
                          )
                      })}
                  </Popover.Content>
                </Popover>
              ); 

            return (
              <div key={i}>
                <p>{v.name}</p>
                {v.list.length > 0 ? ( 

                   <div>  
                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                  <Button uid={v.uid} onClick={viewList} variant="success">View List</Button>
                  </OverlayTrigger> 
                  </div>
                ) : (
                  <button uid={v.uid} onClick={createList}>
                    Create List
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div> None Here Yet </div>
        )}
      </div>
      <button onClick={addChildForm}>Add Child</button>

      {letterToSanta.addForm ? <AddChildForm /> : ""}
    </div>
  );
};

export default LetterToSantaParent;
