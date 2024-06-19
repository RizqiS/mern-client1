import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";

export function useErrorFetch() {
  const resError = useActionData() as { message: string; statusCode: number };
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (resError) {
      setShow(true);
    }
  }, [resError]);

  const closeModalHandler = () => {
    setShow(false);
  };

  return { isShow, resError, closeModalHandler };
}
