import { BASE_URL } from "./utils/utils";

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`ОШИБКА: ${res.status}`)
    )
    .then((res) => {
      return res;
    });
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`ОШИБКА: ${res.status}`)
    )
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`ОШИБКА: ${res.status}`)
    )
    .then((data) => data);
};
