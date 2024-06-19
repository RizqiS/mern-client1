import { IPlaces } from "../types/places.type";
import { fetchUsers } from "../../users/api/userFetch";
import { useQuery } from "react-query";

import { AnimatePresence, motion } from "framer-motion";
import PlaceList from "../components/PlaceList";
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElement/Button";

import { useRouteLoaderData } from "react-router-dom";

export default function ViewPlace() {
  const userData = useRouteLoaderData("token") as { users: { userID: string } };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", userData && userData.users.userID],
    queryFn: ({ signal }) => fetchUsers(signal!, userData && userData.users.userID),
    staleTime: 1000 * 60 * 10,
  });

  const places: IPlaces[] = [];

  if (data && data.userPlace) {
    places.push(...(data.userPlace.place as IPlaces[]));
  }

  return (
    <>
      {isLoading && <p className="mt-12 text-center animate-pulse duration-150">Loading...</p>}
      {isError && <h1 className="text-3xl mt-12 text-center">Please Login</h1>}
      {data && places.length === 0 && (
        <AnimatePresence>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -30 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -30 }}
            className="text-center"
          >
            <Card>
              <h2 className="mb-5">No places found. maybe create one?</h2>
              <Button to="/places/new" className="bg-red-500">
                Share Place
              </Button>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
      {places && places.length > 0 && <PlaceList items={places!} />}
    </>
  );
}
