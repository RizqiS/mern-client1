import { useEffect, useRef } from "react";
import { useForm } from "../../hooks/formSecond-hooks";
import { SignUpSchemaValidation } from "../utils/validation";
import { useNavigation, useSubmit } from "react-router-dom";
import { useErrorFetch } from "../../hooks/users/errorFetch-hook";
import { motion } from "framer-motion";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import Modal from "../../shared/components/UIElement/Modal";
import { useFile } from "../../hooks/files/file-hooks";
import ImageUploudSecond from "../../shared/components/FormElement/ImageUploudSecond";

export default function SignUp() {
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refUsername = useRef<HTMLInputElement>(null);

  const navigation = useNavigation();
  const submit = useSubmit();

  const { files, previewUrl, pickedHandler, removePreview } = useFile({
    file: undefined,
    preview: null,
    valid: false,
  });
  const { isShow, resError, closeModalHandler } = useErrorFetch();
  const { inputValue, error, disable, changeHandler, setErrorHandler, setDisableHandler } = useForm(
    { inputUsername: "", inputEmail: "", inputPassword: "" },
    { errorUsername: "", errorEmail: "", errorPassword: "", errorImage: "" }
  );

  const isLoading = navigation.state === "submitting";
  useEffect(() => {
    if (!inputValue.inputUsername || !inputValue.inputEmail || !inputValue.inputPassword || !files) {
      setDisableHandler(true);
    } else {
      setDisableHandler(false);
    }
  }, [inputValue, setDisableHandler, files]);

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files) {
      return;
    }

    const signUpValidation = SignUpSchemaValidation.safeParse({
      username: refUsername.current?.value.trim() || "",
      email: refEmail.current?.value.trim() || "",
      password: refPassword.current?.value.trim() || "",
      image: files,
    });

    if (!signUpValidation.success) {
      const format = signUpValidation.error.format();
      const username = format.username?._errors;
      const email = format.email?._errors;
      const password = format.password?._errors;
      const image = format.image?._errors;
      setErrorHandler({
        errorUsername: username ? username[0] : "",
        errorEmail: email ? email[0] : "",
        errorPassword: password ? password[0] : "",
        errorImage: image ? image[0] : "",
      });
      setDisableHandler(true);
      return;
    }

    const { data } = signUpValidation;
    const fd = new FormData();
    fd.append("username", data.username);
    fd.append("email", data.email);
    fd.append("password", data.password);
    fd.append("image", data.image);
    submit(fd, { method: "POST", encType: "multipart/form-data" });

    removePreview();
    setDisableHandler(true);
    setErrorHandler({
      errorUsername: "",
      errorEmail: "",
      errorPassword: "",
      errorImage: "",
    });

    const target = e.target as HTMLFormElement;
    target.reset();
  };

  return (
    <>
      <Modal header="Error Occured" className="max-w-md bg-slate-200" onCancel={closeModalHandler} show={isShow}>
        {resError && <h2 className="mt-4 text-lg text-slate-600 text-center">{resError.message}</h2>}
        <button
          onClick={closeModalHandler}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs mt-2"
        >
          Close
        </button>
      </Modal>
      <section>
        <h1 className="text-3xl font-bold font-serif max-w-lg md:max-w-2xl mx-auto mb-6">Sign Up Below</h1>
        <motion.form
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3, ease: "easeIn" } } }}
          initial={"hidden"}
          animate={"visible"}
          onSubmit={registerHandler}
        >
          <Input
            ref={refUsername}
            element="input"
            label={{ title: "Username", htmlFor: "username" }}
            input={{
              type: "username",
              id: "username",
              name: "inputUsername",
              placeholder: "john doe",
              onChange: (e) => changeHandler(e),
            }}
            error={error.errorUsername || null}
          />

          <ImageUploudSecond
            error={error.errorImage || null}
            pickedHandler={pickedHandler}
            preview={previewUrl}
            handleImageSent={removePreview}
            file={files}
          />

          <Input
            ref={refEmail}
            element="input"
            label={{ title: "Email", htmlFor: "email" }}
            input={{
              type: "email",
              id: "email",
              name: "inputEmail",
              placeholder: "johndoe@gmail.com",
              onChange: (e) => changeHandler(e),
            }}
            error={error.errorEmail || null}
          />
          <Input
            ref={refPassword}
            element="input"
            label={{ title: "password", htmlFor: "password" }}
            input={{
              type: "password",
              id: "password",
              name: "inputPassword",
              placeholder: "********",
              onChange: (e) => changeHandler(e),
            }}
            error={error.errorPassword || null}
          />
          <div className="flex justify-between max-w-lg md:max-w-2xl  mt-6 mx-auto  items-center">
            <Button
              className={`md:w-1/2 ${
                disable
                  ? "bg-slate-100  text-black cursor-pointer"
                  : "bg-slate-800 hover:bg-slate-700 transition duration-150 text-white cursor-pointer"
              }`}
              btnAttribute={{ type: "submit", disabled: disable }}
            >
              {isLoading && (
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
              {!isLoading && "Sign Up"}
            </Button>
            <p>
              Don't have an account ?
              <Button className="bg-transparent px-2" to="/auth?mode=signin">
                <span className="text-yellow-500">Login here</span>
              </Button>
            </p>
          </div>
        </motion.form>
      </section>
    </>
  );
}
