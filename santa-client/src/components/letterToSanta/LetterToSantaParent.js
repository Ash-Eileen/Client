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
import { Redirect } from "react-router-dom";

const LetterToSantaParent = (props) => {
  const { store, dispatch } = useGlobalState();
  const { letterToSanta, loggedInUser } = store;

  let [viewed, setViewed] = useState([]);

  // use effect extracts data from data base and puts it into
  // rteadable gloabl state format
  useEffect(() => {
    // extracts names and uid
    getChildren(loggedInUser)
      .then((data) => {
        data.children.map(async (child, i) => {
          let formattedObj = {
            list: [],
            name: child.name,
            uid: child.childUid,
          };

          // extacts list
          await getChildGiftList(child.childUid).then((listData) => {
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
          letterToSanta.children = viewed;

          dispatch({
            type: "setLetterToSanta",
            data: letterToSanta,
          });
        });
      })
      .catch(console.log);
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

  // changes the page into child mode and enables child list creation  
  // for specified child
  const createList = (event) => {
    event.preventDefault();

    letterToSanta.parentMode = false;

    letterToSanta.currentChild = event.target.getAttribute("uid");

    dispatch({
      type: "setLetterToSanta",
      data: letterToSanta,
    });
  };

  return (
    <div> 
      {/* checks if user is logged in */}
      {!loggedInUser ? <Redirect to="/login" /> : ""}
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
      {/* creates popout elements containing relevent childs list  */}
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

            return (
              <div key={i}>
                <p>{v.name}</p>
                {console.log(v.list)}
                {v.list.length > 0 ? (
                  <div>
                    <OverlayTrigger
                      trigger="click"
                      placement="right"
                      overlay={popover}
                    >
                      <Button uid={v.uid} variant="success">
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
