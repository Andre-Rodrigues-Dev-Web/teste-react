import { homedir } from "os";
import path from "path";
export const newsFileLocation = () => {
  const customEnvironmentVariablePath = process.env["NEWS_JSON_PATH"];
  return customEnvironmentVariablePath || path.join(homedir(), "news.json");
};
export const unixTimestamp = () => Math.floor(new Date().getTime() / 1000);
