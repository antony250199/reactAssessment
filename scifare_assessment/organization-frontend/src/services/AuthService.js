import axios from "axios";
import UserService from "./UserService";

let tokenKey = "token";
const baseURL = "http://localhost:8080/";

const isLoggedIn = () => {
  let isLoggedIn = false;
  try {
    if (localStorage.getItem(tokenKey)) {
      isLoggedIn = true;
    }
  } catch (err) {
    console.log(err);
  }
  return isLoggedIn;
};

const getToken = () => {
  let token = "";
  try {
    token = localStorage.getItem(tokenKey);
  } catch (err) {
    console.log(err);
  }
  return token;
};

const setToken = (token) => {
  try {
    localStorage.setItem(tokenKey, token);
  } catch (err) {
    console.log(err);
  }
};

const AuthService = {
  isLoggedIn,
  setToken,
  getToken,
};

export default AuthService;
