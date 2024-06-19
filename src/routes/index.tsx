import { createBrowserRouter } from "react-router-dom";
import { logoutAction, sendRequestCreateUser } from "../users/api/userFetch";
import { Suspense } from "react";
import { sendRequestGetAllPlaces } from "../places/api/placeFetch";

import Root from "../layouts/Root";
import Home from "../pages/Home";
import User from "../users/pages/User";
import SelectPlaceByUser from "../users/pages/SelectPlaceByUser";
import ViewPlace from "../places/pages/ViewPlace";
import SelectPlaceById from "../places/pages/SelectPlaceById";
import NewPlaces from "../places/pages/NewPlaces";
import UpdatePlace from "../places/pages/UpdatePlace";
import Authentication from "../users/pages/Authentication";
import { tokenLoader, checkAuthToken } from "../utils/auth";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "token",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "users",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p className="mt-12 text-center">Loading...</p>}>
                <User />
              </Suspense>
            ),
          },
          {
            path: ":id/places",
            element: (
              <Suspense>
                <SelectPlaceByUser />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "places",
        loader: checkAuthToken,
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <ViewPlace />
              </Suspense>
            ),
          },
          {
            path: ":id",
            action: sendRequestGetAllPlaces,
            element: (
              <Suspense>
                <SelectPlaceById />
              </Suspense>
            ),
          },
          {
            path: "new",
            action: sendRequestGetAllPlaces,
            element: (
              <Suspense>
                <NewPlaces />
              </Suspense>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <Suspense>
                <UpdatePlace />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "auth",
        action: sendRequestCreateUser,
        element: <Authentication />,
      },

      {
        path: "logouts",
        action: logoutAction,
      },
    ],
  },
]);
