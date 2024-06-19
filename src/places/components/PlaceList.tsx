import Card from "../../shared/components/UIElement/Card";
import PlaceItem from "./PlaceItem";
import { IPlaces } from "../types/places.type";
import Button from "../../shared/components/FormElement/Button";
import { AnimatePresence, motion } from "framer-motion";

type TProps = {
  items: IPlaces[];
};

export default function PlaceList(props: TProps) {
  if (props.items.length === 0) {
    return (
      <div className="text-center">
        <Card>
          <h2 className="mb-5">No places found. maybe create one?</h2>
          <Button to="/places/new" className="bg-red-500">
            Share Place
          </Button>
        </Card>
      </div>
    );
  }
  return (
    <section>
      <AnimatePresence>
        <motion.ul
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: [0.5, 1], y: 1 },
          }}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -30 }}
          transition={{ ease: "easeIn", type: "spring" }}
          className="p-12 border grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {props.items.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
