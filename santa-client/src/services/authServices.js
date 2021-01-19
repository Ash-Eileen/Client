import api from "../config/api";

const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

const logoutUser = async (userData) => {
  const response = await api.get("/auth/logout");
  return response.data;
};

const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

const setLoggedInUser = (userDetails) => {
  userDetails
    ? localStorage.setItem("loggedInUser", userDetails._id)
    : localStorage.removeItem("loggedInUser");

  userDetails
    ? localStorage.setItem("username", userDetails.username)
    : localStorage.removeItem("username");
};

const getLoggedInUser = () => {
  return localStorage.getItem("loggedInUser");
};

export {
  loginUser,
  logoutUser,
  registerUser,
  setLoggedInUser,
  getLoggedInUser,
};
