import { useCallback, useState } from "react";
export function useForm<TypeInput, TypeError>(inputObj: TypeInput, errorObject: TypeError) {
  const [inputValue, setInputValue] = useState<TypeInput>(inputObj);

  const [error, setError] = useState<TypeError>(errorObject);

  const [disable, setDisable] = useState<boolean>(true);

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputValue({
        ...inputValue,
        [e.target.name]: e.target.value,
      });
    },
    [inputValue]
  );

  const setErrorHandler = useCallback((error: TypeError) => {
    setError(error);
  }, []);

  const setInputHandler = useCallback((input: TypeInput) => {
    setInputValue((prevInput) => ({ ...prevInput, ...input }));
  }, []);

  const setDisableHandler = useCallback((value: boolean) => {
    setDisable(value);
  }, []);

  return { changeHandler, setErrorHandler, setInputHandler, setDisableHandler, inputValue, error, disable };
}
