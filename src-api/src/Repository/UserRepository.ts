import { readFile, writeFile } from "fs/promises";
import { unixTimestamp, usersFileLocation } from "../util";
import { v4 as uuid } from "uuid";
import { RepositoryError, RepositoryErrorType } from "./RepositoryError";
import { User } from "../Model/User";
const usersPath = usersFileLocation();
interface UserBody {
  name: string;
  username: string;
  passwordHash: string;
}

const saveUsers = async (users: User[]) => {
  let usersJsonString = JSON.stringify(users);
  await writeFile(usersPath, usersJsonString, {
    encoding: "utf8",
  });
};
const getAllUsers = async () => {
  let users: User[];
  try {
    const usersFile = await readFile(usersPath, { encoding: "utf-8" });
    users = JSON.parse(usersFile) as User[];
  } catch (e) {
    const readError = e as NodeJS.ErrnoException;
    if (readError.code && readError.code === "ENOENT") {
      users = [];
    } else {
      throw e;
    }
  }
  return users;
};
export const usernameExists = async (username: string) => {
  const users = await getAllUsers();
  return users.filter((user) => user.username === username).length > 0;
};
export const searchByUsername = async (username: string): Promise<User> => {
  const userList = await getAllUsers();

  if (userList.length === 0) {
    throw new RepositoryError(
      `There are no saved Users`,
      RepositoryErrorType.Empty,
    );
  }
  let foundUser = userList.find((user) => user.username === username);
  if (!foundUser) {
    throw new RepositoryError(
      `No user with username ${username} found`,
      RepositoryErrorType.NotFound,
    );
  }
  return foundUser;
};
export const addUser = async (user: UserBody) => {
  const id = uuid();
  const createdAt = unixTimestamp();
  const savedUser: User = {
    id,
    createdAt,
    name: user.name,
    username: user.username,
    passwordHash: user.passwordHash,
  };
  const userList = [...(await getAllUsers()), savedUser];
  await saveUsers(userList);
  return savedUser;
};
