import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { IPlaces } from "../types/places.type";

const DUMMY_PLACES: IPlaces[] = [
  {
    id: "p1",
    title: "Empire State Building 1",
    description: "One of the most famous sky scrapers in the world!",
    image:
      "https://asset.kompas.com/crops/vLmCpG_RBKx4osyNQWPDELvRLhM=/0x0:4986x3324/750x500/data/photo/2022/09/09/631a9fe403d3a.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creatorId: "u1",
    location: {
      lat: -6.33925,
      lng: 106.78676,
    },
  },
  {
    id: "p2",
    title: "Empire State Building 2",
    description: "One of the most famous sky scrapers in the world!",
    image:
      "https://asset.kompas.com/crops/vLmCpG_RBKx4osyNQWPDELvRLhM=/0x0:4986x3324/750x500/data/photo/2022/09/09/631a9fe403d3a.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creatorId: "u2",
    location: {
      lat: -6.33925,
      lng: 106.78676,
    },
  },
];

export default function SelectPlaceById() {
  const { id } = useParams();
  const place = DUMMY_PLACES.filter((place) => place.id == id);

  return <PlaceList items={place} />;
}
