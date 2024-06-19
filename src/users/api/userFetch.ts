import { QueryClient } from "react-query";
import { ActionFunction, redirect } from "react-router-dom";

type Params = {
  request: Request;
  id: string;
};

type TUserSignUp = {
  username: string | null;
  email: string | null;
  password: string | null;
  image: File | null;
};

type TUserSignin = Omit<TUserSignUp, "username" | "image">;
const urls = import.meta.env.VITE_BACKEND as string;

export const client = new QueryClient();
export const sendRequestCreateUser: ActionFunction<Params> = async ({ request }) => {
  const sp = new URL(request.url).searchParams.get("mode");
  const fd = await request.formData();

  let response;
  let url = urls;

  if (sp === "signup") {
    url += "/api/users/signup";
    response = await fetch(urls, {
      method: request.method,
      body: fd,
    });
  }

  if (sp === "signin") {
    url += "/api/users/signin";
    const users: TUserSignin = {
      email: fd.get("email"),
      password: fd.get("password"),
    } as TUserSignin;

    response = await fetch(url, {
      method: request.method,
      body: JSON.stringify(users),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const data = await response!.json();

  if (response && !response.ok) {
    return data;
  }

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
};

export const fetchUsers = async (signal?: AbortSignal, params?: string) => {
  let url = `${urls}/api/users`;

  if (params) {
    url = `${urls}/api/places/user/${params}`;
  }

  const response = await fetch(url, {
    signal,
  });

  const data = await response.json();

  if (!response.ok) {
    return data;
  }

  return data;
};

export const logoutAction: ActionFunction<Params> = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expiration");
  return redirect("/auth?mode=signin");
};
