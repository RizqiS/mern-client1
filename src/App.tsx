import { RouterProvider } from "react-router-dom";
import { routers } from "./routes/index";
import AuthenticationContext from "./shared/context/auths/auth";

/*
import User from "./users/pages/User";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlaces from "./places/pages/NewPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

import Root from "./layouts/Root";
import Home from "./pages/Home";
import Authentication from "./users/pages/Authentication";
import { getSession } from "./utils/session-data";
import { sendRequestCreateUser } from "./users/api/userFetch";
import { sendRequestGetAllPlaces } from "./places/api/placeFetch";

const User = lazy(() => import("./users/pages/User"));
const SelectPlaceByUser = lazy(() => import("./users/pages/SelectPlaceByUser"));

const ViewPlace = lazy(() => import("./places/pages/ViewPlace"));
const SelectPlaceById = lazy(() => import("./places/pages/SelectPlaceById"));
const NewPlaces = lazy(() => import("./places/pages/NewPlaces"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: getSession,
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
    ],
  },
]);
*/

export default function App() {
  return (
    <>
      <AuthenticationContext>
        <RouterProvider router={routers} />
      </AuthenticationContext>
    </>
  );
}
