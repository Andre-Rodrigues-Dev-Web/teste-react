import { createContext } from "react";
import type { UserInfo } from "../Entities/UserInfo";

interface AuthContextProps {
  userInfo: UserInfo | null;
  events: {
    onLogin: (username: string, password: string) => Promise<void>;
    onLogout: () => Promise<void>;
    onAuthFail: () => Promise<void>;
    onAccountCreation: (userInfo: UserInfo) => void;
  };
}
export const AuthContext = createContext<AuthContextProps>({
  userInfo: null,
  events: {
    onLogin: () => {
      throw new Error("onLogin called before initialization");
    },
    onLogout: () => {
      throw new Error("onLogout called before initialization");
    },
    onAuthFail: () => {
      throw new Error("onAuthFail called before initialization");
    },
    onAccountCreation: () => {
      throw new Error("onAccountCreation called before initialization");
    },
  },
});
