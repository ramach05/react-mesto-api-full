import Api from "./api";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "5b66fd06-2588-48e1-9a08-4e052bdf34cc",
    "Content-Type": "application/json",
  },
});
