import { redirect } from "react-router-dom";

type TuserLocalStorage = {
  users: {
    userID: string;
    email: string;
    token: string;
  };
};

export function getTokenDuration() {
  const expiration = localStorage.getItem("expiration") as string;
  const expirationDate = new Date(expiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const data = JSON.parse(localStorage.getItem("user") as string) as TuserLocalStorage;

  if (!data) {
    return null;
  }

  const tokenDuraion = getTokenDuration();
  if (tokenDuraion < 0) {
    return "EXPIRED";
  }

  return data;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthToken() {
  const token = tokenLoader();

  if (!token) {
    return redirect("/auth?mode=signin");
  }

  return null;
}
