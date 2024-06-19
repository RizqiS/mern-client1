import { useNavigation, useParams, useSubmit } from "react-router-dom";
import { IPlaces } from "../types/places.type";
import { useForm } from "../../hooks/formSecond-hooks";
import { useEffect, useRef } from "react";
import { UpdatePlaceSchema } from "../utils/validation";

import { useQuery } from "react-query";
import { fetchPlaces } from "../api/placeFetch";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";

export default function UpdatePlace() {
  const refTitle = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLTextAreaElement>(null);

  const { id } = useParams();
  const submit = useSubmit();
  const navigation = useNavigation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["places", id],
    queryFn: ({ signal }) => fetchPlaces(signal!, id),
    staleTime: 1000 * 60 * 10,
  });

  const { inputValue, error, disable, setInputHandler, setErrorHandler, setDisableHandler, changeHandler } = useForm(
    { title: "", description: "" },
    { errorTitle: "", errorDescription: "" }
  );

  const isLoadingSubmit = navigation.state === "submitting";

  let place: IPlaces | undefined;
  if (data) {
    place = data.place as IPlaces;
  }

  useEffect(() => {
    if (place) {
      setInputHandler({
        title: place.title,
        description: place.description,
      });
    }
  }, [place, setInputHandler]);

  useEffect(() => {
    if (!inputValue.title || !inputValue.description) {
      setDisableHandler(true);
    } else {
      setDisableHandler(false);
    }
  }, [inputValue, setDisableHandler]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationParseUpdate = UpdatePlaceSchema.safeParse({
      title: refTitle.current?.value.trim() || "",
      description: refDescription.current?.value.trim() || "",
    });

    if (!validationParseUpdate.success) {
      const format = validationParseUpdate.error.format();

      const title = format.title?._errors;
      const description = format.description?._errors;

      setErrorHandler({
        errorTitle: title ? "Title is Required" : "",
        errorDescription: description ? "Description must be at least 5 characters" : "",
      });

      setDisableHandler(true);
      return;
    }

    // TODO: if success validation send request to server
    const { data } = validationParseUpdate;
    submit(data, { method: "PATCH", action: `/places/${id}` });
    // end TODO : if success validation send request to server

    setErrorHandler({
      errorTitle: "",
      errorDescription: "",
    });

    setDisableHandler(true);

    const target = e.target as HTMLFormElement;
    target.reset();
  };

  return (
    <>
      {isLoading && <p className="mt-12 text-center">Loading...</p>}
      {isError && <p className="mt-12 text-center">Error</p>}
      {data && (
        <section>
          <AnimatePresence>
            <motion.form
              onSubmit={submitHandler}
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Input
                ref={refTitle}
                element="input"
                label={{ title: "Title", htmlFor: "title" }}
                input={{
                  id: "title",
                  name: "title",
                  type: "text",
                  value: inputValue.title,
                  onChange: (e) => changeHandler(e),
                }}
                error={error.errorTitle || null}
              />
              <Input
                ref={refDescription}
                element="textarea"
                label={{ title: "Description", htmlFor: "description" }}
                textarea={{
                  id: "description",
                  name: "description",
                  rows: 5,
                  value: inputValue.description,
                  onChange: (e) => changeHandler(e),
                }}
                error={error.errorDescription || null}
              />
              <Button
                className={`max-w-lg md:max-w-2xl ${
                  disable ? "bg-slate-100 text-slate-500" : "bg-red-500 text-slate-100"
                } container mx-auto mt-10 block`}
                btnAttribute={{ type: "submit", disabled: disable }}
              >
                {isLoadingSubmit && (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-black animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </>
                )}
                {!isLoadingSubmit && "Update"}
              </Button>
            </motion.form>
          </AnimatePresence>
        </section>
      )}
    </>
  );
}
