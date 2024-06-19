import { useSearchParams } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Authentication() {
  const [sp] = useSearchParams();
  const switchPage = sp.get("mode");

  if (switchPage === "signup") {
    return <SignUp />;
  }

  if (switchPage === "signin") {
    return <SignIn />;
  }
}
