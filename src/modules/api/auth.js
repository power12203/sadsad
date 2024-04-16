import axios from "axios";

const request = axios.create();

export const login = (username, password) => {
  const response = request.post("api/auth/login", {
    username,
    password,
  });
  return response;
};

export const register = (username, password) => {
  // console.log(username);
  const response = request.post("api/auth/register", {
    username,
    password,
  });
  return response;
};

export const check = () => {
  const response = request.get("api/auth/check");
  return response;
};
//http://13.209.96.80:4000
