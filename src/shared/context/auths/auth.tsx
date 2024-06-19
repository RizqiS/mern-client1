import { useState, useCallback } from "react";
import { AuthContext } from "./auth-context";

type Props = {
  children: React.ReactNode;
};

export default function AuthenticationContext({ children }: Props) {
  const [isLogin, setIsLogin] = useState<boolean | null>(false);

  const onLogin = useCallback((id: boolean) => {
    setIsLogin(id);
  }, []);

  const onLogout = useCallback(() => {
    localStorage.removeItem("user");
    setIsLogin(null);
  }, []);

  const value = {
    isLogin,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
