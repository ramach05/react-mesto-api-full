import Api from "./api";

export const BASE_URL = "https://api.api.domainname.zone.nomoredomains.icu";

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});
