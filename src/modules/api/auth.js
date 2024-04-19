import axios from "axios";

const request = axios.create();

export const login = (username, password) =>
  request.post("api/auth/login", {
    username,
    password,
  });
export const register = (username, password) =>
  request.post("/api/auth/register", { username, password });

export const check = () => request.get("api/auth/check");
export const logout = () => request.post("/api/auth/logout");

//http://13.209.96.80:4000
