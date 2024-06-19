import { useCallback, useState } from "react";
import { z } from "zod";

type TError = {
  errorTitle?: string | null;
  errorDescription?: string | null;
  errorAddress?: string | null;
  errorUsername?: string | null;
  errorEmail?: string | null;
  errorPassword?: string | null;
};

// type TErrorRegister = {
//   errorUsername: string | null;
//   errorEmail: string | null;
//   errorPassword: string | null;
// }

type TNewFormRef = {
  refTitle?: React.RefObject<HTMLInputElement>;
  refDescription?: React.RefObject<HTMLTextAreaElement>;
  refAddress?: React.RefObject<HTMLInputElement>;
  refUsername?: React.RefObject<HTMLInputElement>;
  refEmail?: React.RefObject<HTMLInputElement>;
  refPassword?: React.RefObject<HTMLInputElement>;
};

// type TNewFormRegisterRef = {
//   username: React.RefObject<HTMLInputElement>;
//   email: React.RefObject<HTMLInputElement>;
//   password: React.RefObject<HTMLInputElement>;
// }

type TInputFormType = {
  inputTitle?: string;
  inputDescription?: string;
  inputAddress?: string;
  inputUsername?: string;
  inputEmail?: string;
  inputPassword?: string;
};

// type TInputFormRegister = {
//   username: string | undefined;
//   email: string | undefined;
//   password: string | undefined;
// }
// type TInputFormUpdateType = Omit<TInputFormType, "address">;
// type TUpdateFormRef = Omit<TNewFormRef, "address">;

const NewPlaceSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  description: z
    .string({
      required_error: "description is required",
    })
    .min(5, { message: "description must be at least 5 characters" }),
  address: z
    .string({
      required_error: "address is required",
    })
    .min(5, { message: "Address must be at least 5 characters" }),
});

const UpdatePlaceSchema = z.object({
  title: z.string().min(1),
  description: z
    .string({
      required_error: "description is required",
    })
    .min(5, { message: "description must be at least 5 characters" }),
});

const SignUpSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
    })
    .min(1),
  email: z
    .string({
      required_error: "email is required",
    })
    .includes("@", { message: "Please enter a valid email" }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8, { message: "password must be at least 8 characters" }),
});

const SignInSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .includes("@", { message: "Please enter a valid email" }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8, { message: "password must be at least 8 characters" }),
});

// const LoginSchema = z.object({
//   email: z.string().email({message: 'Please enter a valid email'}),
//   password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
//   username: z.string().min(3, {message: 'Username must be at least 3 characters'})
// });

export function useForm(ref: TNewFormRef, initialInput: TInputFormType, initialError: TError) {
  const [inputType, setInputType] = useState<TInputFormType>({
    ...initialInput,
  });

  const [error, setError] = useState<TError>({
    ...initialError,
  });

  const [isDisable, setDisable] = useState(true);

  /*
   * validation input with zod
   */
  const newInputUser = NewPlaceSchema.safeParse({
    title: ref.refTitle?.current?.value,
    description: ref.refDescription?.current?.value,
    address: ref.refAddress?.current?.value,
  });

  const updateInputUser = UpdatePlaceSchema.safeParse({
    title: ref.refTitle?.current?.value,
    description: ref.refDescription?.current?.value,
  });

  const signUpValidation = SignUpSchema.safeParse({
    username: ref.refUsername?.current?.value,
    email: ref.refEmail?.current?.value,
    password: ref.refPassword?.current?.value,
  });

  const signInValidation = SignInSchema.safeParse({
    email: ref.refEmail?.current?.value,
    password: ref.refPassword?.current?.value,
  });

  /* end validation input */

  const setFormInput = useCallback((input: TInputFormType) => {
    setInputType((prev) => ({ ...prev, ...input }));
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputType({
      ...inputType,
      [e.target.name]: e.target.value,
    });
  };

  const changeErrorHandler = useCallback((errors: TError) => {
    setError(errors);
  }, []);

  const changeDisableHandler = useCallback((disable: boolean) => {
    setDisable(disable);
  }, []);

  /*
   *  clear input and error
   */
  const clearError = () => {
    setError({
      errorTitle: null,
      errorDescription: null,
      errorAddress: null,
      errorUsername: null,
      errorEmail: null,
      errorPassword: null,
    });
  };

  const clearInput = () => {
    setInputType({
      inputTitle: "",
      inputDescription: "",
      inputAddress: "",
      inputUsername: "",
      inputEmail: "",
      inputPassword: "",
    });
  };

  return {
    newInputUser,
    updateInputUser,
    signInValidation,
    signUpValidation,
    error,
    inputType,
    isDisable,
    setFormInput,
    changeHandler,
    changeErrorHandler,
    changeDisableHandler,
    clearError,
    clearInput,
  };
}
