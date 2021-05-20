export const BASE_URL = "http://localhost:3001";

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
    .then((res) => {
      // console.log('res :>> ', res);
      return res.ok ? res.json() : Promise.reject(`ОШИБКА: ${res.status}`)
    })
    .then((data) => {
      // console.log('data :>> ', data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        // console.log('localStorage :>> ', localStorage);
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
    .then((data) => {
      return data;
    });
};
