import { homedir } from "os";
import path from "path";
export const newsFileLocation = () => {
  const customEnvironmentVariablePath = process.env["NEWS_JSON_PATH"];
  return customEnvironmentVariablePath || path.join(homedir(), "news.json");
};
export const usersFileLocation = () => {
  const customEnvironmentVariablePath = process.env["USERS_JSON_PATH"];
  return customEnvironmentVariablePath || path.join(homedir(), "users.json");
};
export const unixTimestamp = () => Math.floor(new Date().getTime() / 1000);
export const jwtSecret = () => {
  const customEnvironmentVariablePath = process.env["JWT_SECRET"];
  return customEnvironmentVariablePath || "123-123-123";
};
