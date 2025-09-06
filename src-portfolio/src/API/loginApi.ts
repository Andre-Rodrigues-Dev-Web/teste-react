import axios from "axios";
import type { UserInfo } from "../Entities/UserInfo";
const loginInstance = axios.create({
  baseURL: "http://localhost:8000/login",
  responseType: "json",
});
export const login = async (
  username: string,
  password: string,
): Promise<UserInfo> => {
  return (await loginInstance.post("/", { username, password }))
    .data as UserInfo;
};
