import React, { useState } from "react";
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
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setErrors([1]);
      });
  };

  return (
    <div>
      <div class="loginBorder d-flex align-items-center flex-column justify-content-center">
        <div class="d-flex flex-column align-items-center">
          <FontAwesomeIcon className="loginLogo my-4" icon={faSleigh} />
          <p class="m-0 loginLogoText">North Pole Post</p>
        </div>
        {errors.length > 0 ? <h5 class="errors">Invalid Credentials</h5> : ""}
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
            onChange={detailsChange}
          ></input>

          <label>Password</label>
          <input
            required
            class="password mb-2"
            type="password"
            name="password"
            placeholder="Enter a password"
            onChange={detailsChange}
          ></input>

          <input
            class="christmasInputButton m-2"
            type="submit"
            value="Login"
          ></input>
        </form>
      </div>
      <p class="m-2">
        Dont have an account?{" "}
        <Link to="/signup">
          <u>Sign Up</u>
        </Link>
      </p>
    </div>
  );
};

export default Login;
