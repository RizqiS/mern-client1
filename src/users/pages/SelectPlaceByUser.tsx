import { useParams } from "react-router-dom";
import { IPlaces } from "../../places/types/places.type";
import { useQuery } from "react-query";
import { fetchUsers } from "../api/userFetch";
import { AnimatePresence, motion } from "framer-motion";
import PlaceList from "../../places/components/PlaceList";
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElement/Button";

export default function SelectPlaceByUser() {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["users", id],
    queryFn: ({ signal }) => fetchUsers(signal!, id),
    staleTime: 1000 * 60 * 10,
  });

  const userPlaces: IPlaces[] = [];

  if (data && data.places) {
    userPlaces.push(...(data.places as IPlaces[]));
  }

  return (
    <>
      {isLoading && <p className="mt-12 text-center animate-pulse duration-150">Loading...</p>}
      {isError && <h1 className="text-3xl mt-12 text-center">something wrong error</h1>}
      {data && userPlaces.length === 0 && (
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
      {userPlaces && userPlaces.length > 0 && <PlaceList items={userPlaces!} />}
    </>
  );
}
