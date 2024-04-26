import AuthService from "./AuthService";
import axios from "axios";

const { setToken, getToken } = AuthService;

// Speciying input into json format
let requestOptions = {
  headers: { "Content-Type": "application/json" },
};

class UserService {
  url = "http://localhost:8080/userApi/";

  getAllUser = async () => {
    requestOptions.headers.token = getToken();
    console.log(requestOptions, "requestOptions");
    return axios.get(`${this.url}getUserList`, requestOptions);
  };

  registerUser(user) {
    return axios.post(`${this.url}register`, user);
  }
  getLoginUser(user) {
    return axios.post(`${this.url}login`, user);
  }

  loginData = async (loginDetails) => {
    try {
      const url = "/userApi/login";

      const response = axios.post(
        `${this.url}login`,
        loginDetails,
        requestOptions
      );
      const data = response;

      const { status } = data;

      if (status) {
        setToken(data.token);
        localStorage.serItem("loginData", JSON.stringify(data));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}

export default new UserService();
