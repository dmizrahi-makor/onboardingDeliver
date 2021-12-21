import axios from "axios";
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const END_POINT = {
  ONBOARDING: "/onboarding/",
  ONBOARDINGSIMPLEFORM: "/onboarding",
  DOCUMENT: "/document/",
  COUNTRY: "country",
  UTILS: "/utils",
  USER: "/user",
};

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const storageKeys = {
  userToken: "token",
  userContent: "content",
};