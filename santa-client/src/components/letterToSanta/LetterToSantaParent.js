import { useGlobalState } from "../../config/store";
import AddChildForm from "./AddChildForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import {
  getChildren,
  getChildGiftList,
} from "../../services/childGiftListServices";

const LetterToSantaParent = (props) => {
  const { store, dispatch } = useGlobalState();
  const { letterToSanta, loggedInUser } = store;

  let [viewed, setViewed] = useState([]); 


  // use effect extracts data from data base and puts it into
  // rteadable gloabl state format
  useEffect(() => {
    getChildren(loggedInUser)
      .then((data) => {
        data.children.map((child, i) => {
          let formattedObj = {
            list: [],
            name: child.name,
            uid: child.childUid,
          };

          getChildGiftList(child.childUid).then((listData) => {
            if (listData[0]) {
              listData[0].gifts.map((gift, i) => {
                if (gift.gift) {
                  formattedObj.list.push(gift.gift);
                }
              });
            }
          });

          viewed.push(formattedObj);
          setViewed(viewed); 
          console.log(viewed)
          letterToSanta.children = viewed; 
          
        });  

      })
      .catch(console.log); 

      dispatch({
        type: "setLetterToSanta",
        data: letterToSanta,
      }); 

   

  }, (viewed = []));  



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
        {/* switch this to data form db rather than global */}
        {letterToSanta.children.length > 0 ? (
          letterToSanta.children.map((v, i) => {
            // put get child gift list here
            // child name is also needed so getChildren too
            const popover = (
              <Popover id={i}>
                <Popover.Title as="h3">{v.name}'s List</Popover.Title>
                <Popover.Content>
                  {v.list.map((gift, i) => {
                    return <li>{gift}</li>;
                  })}
                </Popover.Content>
              </Popover>
            );

            // getChildren(loggedInUser)
            // .then((data)=>{
            //   data.children.map((child,i) =>{

            //     console.log(child.name)

            //     getChildGiftList(child.childUid)
            //     .then((listData)=>{
            //      listData[0].gifts.map((gift,i) =>{
            //       //  console.log(gift.gift)
            //      })
            //     })
            //   })
            // })
            // .catch(console.log)

            return (
              <div key={i}>
                <p>{v.name}</p>
                {v.list.length > 0 ? (
                  <div>
                    <OverlayTrigger
                      trigger="click"
                      placement="right"
                      overlay={popover}
                    >
                      <Button uid={v.uid} onClick={viewList} variant="success">
                        View List
                      </Button>
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
