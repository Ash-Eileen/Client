import React, { useState } from "react";
import { useGlobalState } from "../config/store";
import { loginUser, setLoggedInUser } from "../services/authServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/pages/loginRegister.scss";

const Login = ({ history }) => {
  const initialFormState = {
    username: "",
    password: "",
  };

  const { dispatch } = useGlobalState();

  const [userDetails, setUserDetails] = useState(initialFormState);

  const [errors, setErrors] = useState([]);

  const detailsChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const loginSubmit = (event) => {
    event.preventDefault();

    loginUser(userDetails)
      .then((data) => {
        setLoggedInUser(data);
        dispatch({
          type: "setLoggedInUser",
          data: localStorage.LoggedInUser,
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setErrors([1]);
      });
  };

  return (
    <div>
      <div className="loginBorder d-flex align-items-center flex-column justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon className="loginLogo my-4" icon={faSleigh} />
          <p className="m-0 loginLogoText">North Pole Post</p>
        </div>
        {errors.length > 0 ? (
          <h5 className="errors">Invalid Credentials</h5>
        ) : (
          ""
        )}
        <form
          className="login d-flex flex-column align-items-center"
          onSubmit={loginSubmit}
        >
          <label>Username</label>
          <input
            required
            className="username mb-2"
            type="text"
            name="username"
            placeholder="Enter a username"
            onChange={detailsChange}
          ></input>

          <label>Password</label>
          <input
            required
            className="password mb-2"
            type="password"
            name="password"
            placeholder="Enter a password"
            onChange={detailsChange}
          ></input>

          <input
            className="christmasInputButton m-2"
            type="submit"
            value="Login"
          ></input>
        </form>
      </div>
      <p className="m-2">
        Dont have an account?{" "}
        <Link to="/signup">
          <u>Sign Up</u>
        </Link>
      </p>
    </div>
  );
};

export default Login;
