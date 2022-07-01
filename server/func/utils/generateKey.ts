import { v4 } from "uuid";

export const generateKey = () => {
  const uid = v4().split("-").slice(0, 2);
  return uid.join("");
};
