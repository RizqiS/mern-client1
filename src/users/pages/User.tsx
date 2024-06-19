import { AnimatePresence } from "framer-motion";
import { fetchUsers } from "../api/userFetch";
import UserList from "../components/UserList";
import { useQuery } from "react-query";

export default function User() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers(signal),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return <p className="mt-12 text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="mt-12 text-center">Error</p>;
  }

  return <AnimatePresence>{data && <UserList users={data.users} />}</AnimatePresence>;
}
