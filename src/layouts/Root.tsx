import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../shared/components/Navigation/MainNavigation";
import { QueryClientProvider } from "react-query";
import { client } from "../shared/utils/query-client";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";
export default function Root() {
  const submit = useSubmit();
  const data_token = useLoaderData();

  useEffect(() => {
    if (!data_token) return;
    console.info("info 1");

    if (data_token === "EXPIRED") {
      submit(null, { action: "/logouts", method: "POST" });
      console.info("info 2");
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logouts", method: "POST" });
    }, tokenDuration);
  }, [data_token, submit]);

  return (
    <>
      <MainNavigation />
      <QueryClientProvider client={client}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}
