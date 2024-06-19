import { ActionFunction, json, redirect } from "react-router-dom";
import { client } from "../../shared/utils/query-client";
import { getAuthToken } from "../../utils/auth";

type Params = {
  request: Request;
  params: string;
};

type TCreatePlaces = {
  title: string;
  description: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
};

export type TUpdatePlaces = Pick<TCreatePlaces, "title" | "description">;

const url = import.meta.env.VITE_BACKEND as string;
const token_data = getAuthToken();

export const sendRequestGetAllPlaces: ActionFunction<Params> = async ({ request, params }) => {
  const fd = await request.formData();

  let response;
  let urls = url;
  let places = {} as TCreatePlaces | TUpdatePlaces;

  if (request.method === "POST") {
    urls += `/api/places`;
    response = await fetch(urls, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${token_data.users.token}`,
      },
      body: fd,
    });
  }

  if (request.method === "PATCH") {
    urls += `/api/places/${params.id}`;
    places = {
      title: fd.get("title")!,
      description: fd.get("description")!,
    } as TUpdatePlaces;

    response = await fetch(urls, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_data.users.token}`,
      },
      body: JSON.stringify(places),
    });
  }

  const data = await response!.json();

  if (response && !response.ok) {
    return json(data, { status: response.status });
  }

  client.invalidateQueries({ queryKey: ["users"] });
  return redirect("/places");
};

export async function fetchPlaces(signal: AbortSignal, placeId?: string) {
  let urls = `${url}/api/places`;

  if (placeId) {
    urls = `${url}/api/places/${placeId}`;
  }

  const response = await fetch(urls, { signal });
  const data = await response.json();
  return data;
}

export const deletePlace = async ({ id }: { id: string }) => {
  const response = await fetch(`${url}/api/places/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token_data.users.token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return data;
};
