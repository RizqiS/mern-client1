import { useEffect, useRef } from "react";
import { useForm } from "../../hooks/formSecond-hooks";
import { NewPlaceSchemaValidation } from "../utils/validation";
import { useNavigation, useRouteLoaderData, useSubmit } from "react-router-dom";

import { motion } from "framer-motion";
import Input from "../../shared/components/FormElement/Input";
import Button from "../../shared/components/FormElement/Button";
import { useFile } from "../../hooks/files/file-hooks";

import ImageUploudSecond from "../../shared/components/FormElement/ImageUploudSecond";

type TtokenUsers = {
  users: { userID: string };
};

export default function NewPlaces() {
  const token = useRouteLoaderData("token") as TtokenUsers;

  const refTitle = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLTextAreaElement>(null);
  const refAddress = useRef<HTMLInputElement>(null);
  const refLat = useRef<HTMLInputElement>(null);
  const refLng = useRef<HTMLInputElement>(null);

  const submit = useSubmit();
  const navigation = useNavigation();

  const { files, pickedHandler, previewUrl, removePreview } = useFile({ file: undefined, preview: "", valid: false });
  const { inputValue, error, disable, changeHandler, setErrorHandler, setDisableHandler } = useForm(
    { title: "", description: "", address: "", lat: 0, lng: 0 },
    { title: "", description: "", address: "", lat: "", lng: "", image: "" }
  );

  const isLoadingSubmit = navigation.state === "submitting";
  useEffect(() => {
    if (!inputValue.title || !inputValue.description || !inputValue.address || !inputValue.lat || !inputValue.lng) {
      setDisableHandler(true);
    } else {
      setDisableHandler(false);
    }
  }, [inputValue, setDisableHandler]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationNewPlaceParse = NewPlaceSchemaValidation.safeParse({
      title: refTitle.current?.value.trim() || "",
      description: refDescription.current?.value.trim() || "",
      address: refAddress.current?.value.trim() || "",
      lat: refLat.current?.value ? Number(refLat.current?.value.trim()) : 0,
      lng: refLng.current?.value ? Number(refLat.current?.value.trim()) : 0,
      image: files,
    });

    if (!validationNewPlaceParse.success) {
      const format = validationNewPlaceParse.error.format();
      const title = format.title?._errors;
      const description = format.description?._errors;
      const address = format.address?._errors;
      const lat = format.lat?._errors;
      const lng = format.lng?._errors;
      const image = format.image?._errors;

      setErrorHandler({
        title: title ? title[0] : "",
        description: description ? description[0] : "",
        address: address ? address[0] : "",
        lat: lat ? lat[0] : "",
        lng: lng ? lng[0] : "",
        image: image ? image[0] : "",
      });
      setDisableHandler(true);
      return;
    }

    // if success validation send request to server
    const { data } = validationNewPlaceParse;
    const fd = new FormData();

    fd.append("title", data.title);
    fd.append("description", data.description);
    fd.append("address", data.address);
    fd.append("location", JSON.stringify({ lat: data.lat, lng: data.lng }));
    fd.append("image", data.image);
    fd.append("creator", token.users.userID);

    submit(fd, { method: "POST", action: "/places/new", encType: "multipart/form-data" });
    // end
    setErrorHandler({ title: "", description: "", address: "", lat: "", lng: "", image: "" });
    setDisableHandler(true);
    removePreview();
    const target = e.target as HTMLFormElement;
    target.reset();
  };

  return (
    <section>
      <motion.form
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3, ease: "easeIn" } } }}
        initial={"hidden"}
        animate={"visible"}
        onSubmit={handleSubmit}
      >
        <Input
          ref={refTitle}
          element="input"
          label={{ title: "Title Place", htmlFor: "title" }}
          input={{
            id: "title",
            name: "title",
            type: "text",
            placeholder: "Enter Title Place",
            onChange: (e) => changeHandler(e),
          }}
          error={error.title || null}
        />

        <ImageUploudSecond
          file={files}
          pickedHandler={pickedHandler}
          preview={previewUrl}
          handleImageSent={removePreview}
          error={error.image || null}
        />

        <Input
          ref={refDescription}
          element="textarea"
          label={{ title: "Description Place", htmlFor: "description" }}
          textarea={{
            id: "description",
            name: "description",
            typeof: "text",
            placeholder: "Enter description place",
            rows: 5,
            onChange: (e) => changeHandler(e as React.ChangeEvent<HTMLTextAreaElement>),
          }}
          error={error.description || null}
        />
        <Input
          ref={refAddress}
          element="input"
          label={{ title: "Address Place", htmlFor: "address" }}
          input={{
            id: "address",
            name: "address",
            type: "text",
            placeholder: "Enter address place",
            onChange: (e) => changeHandler(e),
          }}
          error={error.address || null}
        />

        <Input
          ref={refLat}
          element="input"
          label={{ title: "Lat Cordinate", htmlFor: "lat" }}
          input={{
            id: "lat",
            name: "lat",
            type: "number",
            placeholder: "Enter lat cordinate place",
            onChange: (e) => changeHandler(e),
          }}
          error={error.lat || null}
        />

        <Input
          ref={refLng}
          element="input"
          label={{ title: "Lng Cordinate", htmlFor: "lng" }}
          input={{
            id: "lng",
            name: "lng",
            type: "number",
            placeholder: "Enter lng cordinate place",
            onChange: (e) => changeHandler(e),
          }}
          error={error.lng || null}
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
          {!isLoadingSubmit && "Submit"}
        </Button>
      </motion.form>
    </section>
  );
}
