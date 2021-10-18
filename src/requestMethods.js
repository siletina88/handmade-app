import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const getStorage = JSON.parse(localStorage.getItem("persist:app"));

const isValidToken = () => {
  if (getStorage) {
    if (getStorage.user.includes("accessToken")) {
      return true;
    }
  }
};

const TOKEN = isValidToken() ? JSON.parse(JSON.parse(localStorage.getItem("persist:app")).user).currentUser.accessToken : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
