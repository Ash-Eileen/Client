import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../config/store";
import { logoutUser, setLoggedInUser } from "../services/authServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSleigh, faCandyCane } from "@fortawesome/free-solid-svg-icons";
import ChristmasButton from "./ChristmasButton";
import "../styles/pages/nav.scss";

const Nav = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;

  // logs out user, clears global state back to initial and local storage
  const logout = () => {
    const letterToSanta = {
      parentMode: true,
      addForm: false,
      currentChild: false,
      children: [],
    };

    const giftLists = {};

    logoutUser(loggedInUser)
      .then(() => {
        setLoggedInUser();

        dispatch({
          type: "setLoggedInUser",
          data: null,
        });

        dispatch({
          type: "setGiftLists",
          data: giftLists,
        });

        dispatch({
          type: "setLetterToSanta",
          data: letterToSanta,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <Link to="/">
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon className="logo" icon={faSleigh} />
            <p className="m-0 logoText">North Pole Post</p>
          </div>
        </Link>
      </div>
      <div className="col d-flex align-items-center justify-content-center">
        <Link className="navOption" to="/about-us">
          About Us
        </Link>

        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle navOption"
            href="/#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Activities
          </a>

          <div
            className="dropdown-menu navOption dropDownMenu"
            aria-labelledby="navbarDropdown"
          >
            <Link className="dropdown-item dropDownOption" to="/gift-list">
              Gift List
            </Link>
            <Link
              className="dropdown-item dropDownOption"
              to="/advent-calender"
            >
              Advent Calender
            </Link>
            <Link
              className="dropdown-item dropDownOption"
              to="/Letter-to-Santa"
            >
              Letter to Santa
            </Link>
            <Link className="dropdown-item dropDownOption" to="/">
              Secret Santa
            </Link>
          </div>
        </div>
      </div>

      <div className="col d-flex align-items-center justify-content-center">
        <div className="logDiv">
          {loggedInUser ? (
            <div>
              <ChristmasButton
                className="log"
                to="/login"
                text="logout"
                icon={faCandyCane}
                onClick={logout}
              />
            </div>
          ) : (
            <div className="log">
              <ChristmasButton
                className="log"
                icon={faCandyCane}
                to="/login"
                text="Login"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
