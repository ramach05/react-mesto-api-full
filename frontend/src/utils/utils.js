import Api from "./api";

export const BASE_URL = "http://localhost:3001";

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});
