import React from "react";
import "../../styles/pages/giftCards.scss";
import { useGlobalState } from "../../config/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { addGiftList, updateGiftList } from "../../services/giftListServices";

const List = (props) => {
  const { store, dispatch } = useGlobalState();
  const { giftLists, loggedInUser } = store;
  const { identifer } = props;

  //   deletes a selected gift and updates global state
  const deleteGift = (event) => {
    event.preventDefault();

    giftLists[identifer].gifts.splice(event.target.getAttribute("index"), 1);

    dispatch({
      type: "setGiftLists",
      data: giftLists,
    });
  };

  const ColoredButton = styled.button`
    color: #3f3f3f;
    background-color: ${giftLists[identifer].color};

    :hover {
      background-color: #3f3f3f;
      color: ${giftLists[identifer].color};
    }
  `;

  // adds a gift to the global state
  const saveList = (event) => {
    event.preventDefault(); 

    console.log("saved list")

    if (giftLists[identifer]) {
      giftLists[identifer].gifts = [event.target.addItem.value];

      giftLists[identifer].receiver = event.target.name.value;

      const restructuredGiftListSave = {
        gifts: [{ gift: event.target.addItem.value }],
        receiver: giftLists[identifer].receiver,
        uid: identifer,
      };

      addGiftList(restructuredGiftListSave, localStorage.loggedInUser)
        .then(() => { 
          dispatch({
            type: "setGiftLists",
            data: giftLists,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } 
    event.target.addItem.value = ""
  };

  const updateList = (event) => {
    event.preventDefault(); 

    console.log("added item to existing list")


    if (giftLists[identifer]) {
      giftLists[identifer].gifts.push(event.target.addItem.value); 

      let formattedGifts = []

      giftLists[identifer].gifts.map((v,i)=>{ 
        formattedGifts.push({gift: v})
      })  

      const restructuredGiftListUpdate = {
        gifts: formattedGifts,
        uid: identifer,
      }; 


      updateGiftList(restructuredGiftListUpdate, localStorage.loggedInUser)
        .then(() => { 
          dispatch({
            type: "setGiftLists",
            data: giftLists,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }  
    console.log(event.target.addItem.value)
    event.target.addItem.value = "" 
    
  };

  const meColor = (event) => {
    giftLists[identifer].color = event.target.value;

    dispatch({
      type: "setGiftLists",
      data: giftLists,
    });
  };

  let cardStyle =
    "d-flex align-items-center justify-content-center flex-column" +
    ` ${giftLists[identifer].cardShape}`;

  return (
    <div
      id={identifer}
      style={{ backgroundColor: `${giftLists[identifer].color}` }}
      class={cardStyle}
    >
      <div class="hole"></div>
      <form
        class="d-flex flex-column align-items-center giftForm"
        onSubmit={giftLists[identifer].receiver ? updateList : saveList}
      > 

        {giftLists[identifer].receiver ? (
          <h3>{giftLists[identifer].receiver}</h3>
        ) : (
          <div>
            <h3>Name</h3>
            <input
              class="nameInput"
              type="text"
              id="name"
              name="name"
              value={giftLists[identifer].receiver}
              required
            />
          </div>
        )}
        <div class="row row-cols-2">
          {giftLists[identifer].gifts &&
            giftLists[identifer].gifts.map((v, i) => { 
              console.log(v)
              return (
                <div
                  key={i}
                  class="gift col d-flex justify-content-center my-2"
                >
                  <h4></h4>
                  <p class="m-1">{v}</p>
                  <ColoredButton
                    class={"deleteGift" + "cardButton"}
                    index={i}
                    onClick={deleteGift}
                  >
                    <div index={i}>Delete</div>
                  </ColoredButton>
                </div>
              );
            })}
        </div>
        List:
        <input class="giftInput" type="text" name="addItem" required></input>
        <input
          type="color"
          list="presetColors"
          value={giftLists[identifer].color}
          onChange={meColor}
        />
        <datalist id="presetColors">
          <option>#ff857a</option>
          <option>#e9ae81</option>
          <option>#e9e481</option>
          <option>#b7e981</option>
          <option>#85e981</option>
          <option>#81e9c1</option>
          <option>#81dee9</option>
          <option>#819be9</option>
          <option>#9d81e9</option>
          <option>#e981e9</option>
          <option>#e98193</option>
        </datalist>
        <input
          class="giftSubmit"
          type="submit"
          name="makeList"
          value={giftLists[identifer].receiver ? "Add Gift" : "Save List"}
        />
      </form>

      <div class="d-flex align-items-center my-2">
        <div class="line"></div>
        <FontAwesomeIcon
          className="giftCardIcon"
          icon={giftLists[identifer].icon}
        />
        <div class="line"></div>
      </div>
    </div>
  );
};

export default List;
