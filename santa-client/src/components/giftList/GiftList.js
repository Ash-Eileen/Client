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
  const { giftLists } = store;

  let [listData, setListData] = useState("");

  const extractData = async () => {
    await getGiftList(localStorage.loggedInUser)
      .then((data) => {
        listData = [data];
        data.map((v, i) => {
          let tempGifts = [];
          v.gifts.map((v, i) => {
            tempGifts.push(v.gift);
          });

          const receiver = v.receiver;
          const user = v.user;
          const _id = v._id;

          giftLists[v.uid] = {
            receiver: receiver,
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

  useEffect(() => {
    extractData();
    setListData(listData);
  }, [extractData, listData]);

  useEffect(() => {
    if (!localStorage.loggedInUser) {
      props.history.push("/login");
    }
  });

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

  let randomId = uuidv4();

  const addList = (event) => {
    event.preventDefault();

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
    event.stopPropagation();

    delete giftLists[event.target.id];

    let uid = event.target.id;

    deleteGiftList(localStorage.loggedInUser, uid)
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
      <div className="headerButton">
        <h1 className="giftListHeader">Gift List</h1>

        <div className="d-flex m-3">
          <ChristmasButton onClick={addList} text="Add Gift List" />
        </div>
      </div>

      <div className="row row-cols-3 d-flex justify-content-around">
        {Object.keys(giftLists).length > 0 &&
          Object.keys(giftLists).map((v, i) => {
            return (
              <div key={i}>
                <div className="col my-3 d-flex flex-column align-items-center">
                  <List identifer={v} />
                  <div className="my-3" onClick={deleteList}>
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
