import { redirect } from "react-router-dom";

export function getSession() {
  const session = JSON.parse(sessionStorage.getItem("user")!);
  return session;
}

export function sessionCheck() {
  const session = getSession();
  if (!session) {
    return redirect("/auth?mode=signin");
  }
  return null;
}
