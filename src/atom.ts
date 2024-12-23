import { atom } from "recoil";

export const jwtState = atom({
  key: "jwtState",
  default: localStorage.getItem("ACCESS_TOKEN")||""
});


