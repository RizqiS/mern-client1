import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

export default function NavLinks() {
  const data = useRouteLoaderData("token") as { users: { token: string } } | null;

  const handleActiveLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "w-1/2 text-black bg-yellow-500 p-2 rounded-lg md:w-max" : "text-black p-2";
  };

  console.log(data);
  return (
    <li className="flex flex-col gap-y-4 p-2 md:p-0 md:gap-y-0 md:space-x-6 md:flex-row md:items-center  ">
      <NavLink to={"/"} className={handleActiveLink} end>
        Home
      </NavLink>
      {!data && (
        <NavLink to={"/users"} className={handleActiveLink} end>
          All User
        </NavLink>
      )}
      {data && (
        <NavLink to={"/places"} className={handleActiveLink} end>
          My Place
        </NavLink>
      )}
      {data && (
        <NavLink to={"/places/new"} className={handleActiveLink} end>
          Add Places
        </NavLink>
      )}

      {!data ? (
        <NavLink to={"/auth?mode=signin"} className={handleActiveLink}>
          Authentication
        </NavLink>
      ) : (
        <Form method="post" action="/logouts">
          <button type="submit">Logout</button>
        </Form>
      )}
    </li>
  );
}
