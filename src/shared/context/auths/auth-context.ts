import React from "react";

interface IAuthContext {
  isLogin: boolean | null;
  onLogin(id: boolean): void;
  onLogout(): void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isLogin: false,
  onLogin: () => {},
  onLogout: () => {},
});
