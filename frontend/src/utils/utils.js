import Api from "./api";

export const BASE_URL = "https://api.api.domainname.zone.nomoredomains.icu";

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGE0OTE5YjdjMDk1YjNmMGM5Y2M2NDkiLCJpYXQiOjE2MjEzOTgxMTIsImV4cCI6MTYyMjAwMjkxMn0.9dcMdor8SetpNNmPq41N23Dv8mr3YVPqNfj8MnK8kcA
