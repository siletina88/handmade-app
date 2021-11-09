import axios from "axios";
import { store } from "./redux/store";
const { REACT_APP_BASE_URL } = process.env;

const BASE_URL = REACT_APP_BASE_URL;

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
