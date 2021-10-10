import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjAxZjViMzczYTljNjAzYzE3NDVmMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzg1OTkwMCwiZXhwIjoxNjMzOTQ2MzAwfQ.Kari5TdFwH-7CRaz3OuQMdflmE0S8nM7aRAK5vOIqmA";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
