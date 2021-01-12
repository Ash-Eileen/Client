import React, { useState, useEffect } from "react";
import List from "./List";
import { useGlobalState } from "../../config/store";
import { v4 as uuidv4 } from "uuid";
import ChristmasButton from "../ChristmasButton";
import {
  faGift,
  faSnowflake,
  faStar,
  faHollyBerry,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/styles.scss";
import { deleteGiftList, getGiftList } from "../../services/giftListServices";

const GiftList = (props) => {
  const { store, dispatch } = useGlobalState();
  const { giftLists, loggedInUser } = store;

  let [listData, setListData] = useState("");

  useEffect(() => {
    extractData();
    setListData(listData);
    console.log(giftLists);
  }, (listData = ""));

  const randomColor = () => {
    const colors = [
      "#e99481",
      "#e9ae81",
      "#e9e481",
      "#b7e981",
      "#85e981",
      "#81e9c1",
      "#81dee9",
      "#819be9",
      "#9d81e9",
      "#e981e9",
      "#e98193",
    ];
    const randomNumber = Math.floor(Math.random() * colors.length);
    return colors[randomNumber];
  };

  const randomIcon = () => {
    const icons = [faGift, faHollyBerry, faSnowflake, faStar];
    const randomNumber = Math.floor(Math.random() * icons.length);
    return icons[randomNumber];
  };

  const randomBoxStyle = () => {
    const boxStyles = [
      "styledBoxTrapez",
      "styledBoxSquare",
      "styledBoxPentagon",
    ];
    const randomNumber = Math.floor(Math.random() * boxStyles.length);

    return boxStyles[randomNumber];
  };

  const extractData = async () => {
    await getGiftList(loggedInUser)
      .then((data) => {
        listData = [data];
        console.log(data)
        data.map((v, i) => {
          let tempGifts = [];
          v.gifts.map((v, i) => {
            tempGifts.push(v.gift);
          });

          const reciever = v.receiver;
          const user = v.user;
          const _id = v._id;

          giftLists[v.uid] = {
            reciever: reciever,
            user: user,
            gifts: tempGifts,
            _id: _id,
            color: randomColor(),
            cardShape: randomBoxStyle(),
            icon: randomIcon(),
          }; 

        });

        dispatch({
          type: "setGiftLists",
          data: giftLists,
        }); 
      })
      .catch(console.log);
  };

  let randomId = uuidv4();

  const addList = (event) => {
    event.preventDefault();
    // extractData()

    giftLists[randomId] = {};

    giftLists[randomId].cardShape = randomBoxStyle();

    giftLists[randomId].icon = randomIcon();

    giftLists[randomId].color = randomColor();

    dispatch({
      type: "setGiftLists",
      data: giftLists,
    });
  };

  const deleteList = (event) => {
    event.preventDefault(); 
    event.stopPropagation()
   
    // console.log( "BEFORE")
    // console.log(giftLists)
    console.log(giftLists[event.target.id]) 
    delete giftLists[event.target.id]; 

    // console.log(event.target.id)
    // console.log(giftLists) 


    let uid = {
      uid: event.target.id,
    }; 

    let currentUserId = { 
      user: loggedInUser
    }; 

    deleteGiftList(currentUserId, uid)
      .then(() => {
        dispatch({
          type: "setGiftLists",
          data: giftLists,
        });
      })
      .catch(console.log); 

  };

  return (
    <div>
      <div class="headerButton">
        <h1 class="giftListHeader">Gift List</h1>

        <div class="d-flex m-3">
          <ChristmasButton onClick={addList} text="Add Gift List" />
        </div>
      </div>

      <div class="row row-cols-3 d-flex justify-content-around">
        {Object.keys(giftLists).length > 0 &&
          Object.keys(giftLists).map((v, i) => {
            return (
              <div>
                <div class="col my-3 d-flex flex-column align-items-center">
                  <List identifer={v} />
                  <div class="my-3" onClick={deleteList}>
                    <ChristmasButton
                      id={v}
                      text="Delete List"
                      onClick={deleteList}
                      className="deleteList"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GiftList;
