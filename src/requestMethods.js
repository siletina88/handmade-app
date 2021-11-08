import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import axios from "axios";
import { store } from "./redux/store";

const BASE_URL = "http://localhost:5000/api/";

// axios.interceptors.request.use(
//   function (config) {
//     const token = store.getState().user.currentUser.accessToken;

//     if (token != null) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   function (err) {
//     return Promise.reject(err);
//   }
// );

const getStorage = JSON.parse(localStorage.getItem("persist:app"));

const isValidToken = () => {
  if (getStorage) {
    if (getStorage.user.includes("accessToken")) {
      return JSON.parse(JSON.parse(localStorage.getItem("persist:app")).user).currentUser.accessToken;
    }
  }
};

// store

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:app")).user).currentUser.accessToken;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

//This allows you to intercept the request before it is sent and alter headers or anyting else that is passed to the axios config.
userRequest.interceptors.request.use(
  (config) => {
    const token = store.getState().user.currentUser.accessToken;
    config.headers["token"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("Interceptor Request Error" + error);
  }
);

//This allows you to intercept the response and check the status and error messages and if ncessary reject the promise.
