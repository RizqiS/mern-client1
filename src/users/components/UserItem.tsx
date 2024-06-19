import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElement/Avatar";
import Card from "../../shared/components/UIElement/Card";
import { IUser } from "../types/user.types";

type TProps = {
  user: IUser;
};
const urls = import.meta.env.VITE_BACKEND as string;
export default function UserItem(props: TProps) {
  return (
    <li className="w-full px-12 md:px-0 md:w-1/2">
      <Card className="bg-indigo-950 hover:bg-yellow-400 group transition duration-150">
        <Link to={`${props.user.id}/places`} className="flex space-x-4">
          <div>
            <Avatar src={`${urls}/${props.user.image}`} alt={props.user.name} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1.5 capitalize text-yellow-400 group-hover:text-slate-800 md:text-3xl">
              {props.user.name}
            </h2>
            <h3 className="text-base font-bold text-white group-hover:text-slate-800 md:text-xl">
              {props.user.place.length} {props.user.place.length === 0 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}
