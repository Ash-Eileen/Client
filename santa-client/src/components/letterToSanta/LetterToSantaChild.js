import { useGlobalState } from "../../config/store";
import React, { useState } from "react";
import { loginUser } from "../../services/authServices";
import { addChildGiftList } from "../../services/childGiftListServices";
import { v4 as uuidv4 } from "uuid";
import "../../styles/pages/letterToSanta.scss";
import ChristmasButton from "../ChristmasButton";

const LetterToSantaChild = (props) => {
  const { store, dispatch } = useGlobalState();
  const { letterToSanta } = store;

  const [showLogin, setShowLogin] = useState(false);
  const [errors, setErrors] = useState([]);

  const addPresent = (event) => {
    event.preventDefault();

    letterToSanta.children.map((v, i) => {
      if (v.uid === letterToSanta.currentChild) {
        return v.list.push(event.target.present.value);
      }
    });

    event.target.present.value = "";

    dispatch({
      type: "setLetterToSanta",
      data: letterToSanta,
    });
  };

  const finalizeList = (event) => {
    event.preventDefault();

    letterToSanta.children.map((v, i) => {
      if (v.uid === letterToSanta.currentChild) {
        let formattedGifts = {
          uid: uuidv4(),
          gifts: [],
        };

        v.list.map((v, i) => {
          return formattedGifts.gifts.push({ gift: v });
        });

        addChildGiftList(letterToSanta.currentChild, formattedGifts)
          .then()
          .catch(console.log);
      }
    });

    setShowLogin(true);
  };

  const loginSubmit = (event) => {
    event.preventDefault();

    let userDetails = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    loginUser(userDetails)
      .then(() => {
        letterToSanta.parentMode = true;
        dispatch({
          type: "setLetterToSanta",
          data: letterToSanta,
        });
      })
      .catch(() => {
        setErrors([1]);
      });
  };

  return (
    <div>
      <div className="row row-cols-2">
        <div className="col">
          <img
            className="santa"
            src={window.location.origin + "/images/dabbingSanta.png"}
            alt="santa"
          />
        </div>
        <div className="col">
          <h3>My List</h3>
          <div className="childList">
            {letterToSanta.children.map((children, i) => {
              if (children.uid === letterToSanta.currentChild) {
                return children.list.map((present, i) => {
                  return <li key={i}>{present}</li>;
                });
              }
            })}
          </div>
        </div>
      </div>
      <p className="my-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus urna
        magna, a luctus arcu dignissim at. Sed et lacus in urna auctor egestas.
        Mauris mollis mauris ut augue tempor iaculis. Curabitur vitae erat urna.
        Vivamus tristique cursus lacinia.
      </p>

      <form
        onSubmit={addPresent}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <h3>What can santa get for you?</h3>
        <input
          required
          type="text"
          name="present"
          placeholder="what would you like?"
        ></input>

        <input
          className="christmasInputButton buttonFont m-2"
          type="submit"
          value="Add Present"
        ></input>
      </form>

      {/* <button onClick={finalizeList}>All Done</button>  */}
      <div className="d-flex justify-content-center align-items-center my-3">
        <ChristmasButton text="All Done" onClick={finalizeList} />
      </div>
      <p>before you press this button go get your parent</p>
      {/* implement password and username check */}
      {showLogin ? (
        <div className="secondaryLogin">
          {errors.length > 0 ? <h5 className="errors">Thats not Right</h5> : ""}

          <form
            className="login d-flex flex-column align-items-center"
            onSubmit={loginSubmit}
          >
            <p>
              Go get your parent and get them to login to confirm your letter to
              santa!
            </p>
            <label>Username</label>
            <input
              required
              className="username mb-2"
              type="text"
              name="username"
              placeholder="Enter a username"
            ></input>

            <label>Password</label>
            <input
              required
              className="password mb-2"
              type="password"
              name="password"
              placeholder="Enter a password"
            ></input>

            <input
              className="christmasInputButton m-2"
              type="submit"
              value="Login"
            ></input>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LetterToSantaChild;
