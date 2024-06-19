import UserItem from "./UserItem";
import { IUser } from "../types/user.types";
import { motion } from "framer-motion";
type TProps = {
  users: IUser[];
};

export default function UserList(props: TProps) {
  if (props.users.length === 0) {
    return (
      <div className="text-center mt-12 font-bold">
        <h2>no users found</h2>
      </div>
    );
  }

  return (
    <motion.ul
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: [0.5, 1] },
      }}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      transition={{ ease: "easeIn" }}
      className="mt-12 flex flex-col space-y-6 items-center justify-center"
    >
      {props.users.map((item) => (
        <UserItem key={item.id} user={item} />
      ))}
    </motion.ul>
  );
}
