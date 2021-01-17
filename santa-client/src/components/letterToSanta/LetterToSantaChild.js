import { useGlobalState } from "../../config/store";
import React, { useState } from "react";
import { loginUser } from "../../services/authServices";
import { addChildGiftList } from "../../services/childGiftListServices";
import { v4 as uuidv4 } from "uuid";

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

    console.log(letterToSanta.children);

    event.target.present.value = "";

    dispatch({
      type: "setLetterToSanta",
      data: letterToSanta,
    });
  };

  const finalizeList = (event) => {
    event.preventDefault();

    console.log(letterToSanta);

    letterToSanta.children.map((v, i) => {
      if (v.uid === letterToSanta.currentChild) {
        console.log(v.list);

        let formattedGifts = {
          uid: uuidv4(),
          gifts: [],
        };

        v.list.map((v, i) => {
          formattedGifts.gifts.push({ gift: v });
        });

        console.log(letterToSanta.currentChild);
        console.log(formattedGifts);

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

    console.log(userDetails);

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
      <h3>Santa Here</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus urna
        magna, a luctus arcu dignissim at. Sed et lacus in urna auctor egestas.
        Mauris mollis mauris ut augue tempor iaculis. Curabitur vitae erat urna.
        Vivamus tristique cursus lacinia.
      </p>

      <form onSubmit={addPresent}>
        <h3>What can santa get for you?</h3>
        <input
          required
          type="text"
          name="present"
          placeholder="what would you like?"
        ></input>

        <input
          class="christmasInputButton m-2"
          type="submit"
          value="Add Present"
        ></input>
      </form>

      <h3>My List</h3>
      <div class="childList">
        {letterToSanta.children.map((children, i) => {
          if (children.uid === letterToSanta.currentChild) {
            return children.list.map((present, i) => {
              console.log(present);
              return <li key={i}>{present}</li>;
            });
          }
        })}
      </div>

      <button onClick={finalizeList}>All Done</button>
      <p>before you press this button go get your parent</p>
      {/* implement password and username check */}
      {showLogin ? (
        <div>
          {errors.length > 0 ? <h5 class="errors">Thats not Right</h5> : ""}

          <form
            class="login d-flex flex-column align-items-center"
            onSubmit={loginSubmit}
          >
            <label>Username</label>
            <input
              required
              class="username mb-2"
              type="text"
              name="username"
              placeholder="Enter a username"
            ></input>

            <label>Password</label>
            <input
              required
              class="password mb-2"
              type="password"
              name="password"
              placeholder="Enter a password"
            ></input>

            <input
              class="christmasInputButton m-2"
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
