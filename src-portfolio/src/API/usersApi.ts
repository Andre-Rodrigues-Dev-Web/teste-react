import axios from "axios";
import type { UserInfo } from "../Entities/UserInfo";
const usersApi = axios.create({
  baseURL: "http://localhost:8000/users",
  responseType: "json",
});
export const addUser = async ({
  name,
  username,
  password,
}: {
  name: string;
  username: string;
  password: string;
}) => {
  return (await usersApi.post("/", { name, username, password }))
    .data as UserInfo;
};
