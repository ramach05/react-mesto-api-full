import Api from "./api";

export const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGE0OTE5YjdjMDk1YjNmMGM5Y2M2NDkiLCJpYXQiOjE2MjEzOTgxMTIsImV4cCI6MTYyMjAwMjkxMn0.9dcMdor8SetpNNmPq41N23Dv8mr3YVPqNfj8MnK8kcA",
    "Content-Type": "application/json",
  },
});

// 5b66fd06-2588-48e1-9a08-4e052bdf34cc