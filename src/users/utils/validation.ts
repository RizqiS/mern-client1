import { z } from "zod";
import { MAX_FILE_SIZE, checkFileType } from "../../shared/utils/format-file";

export const ExampleImage = z.object({
  image: z
    .instanceof(File)
    .refine((file: File) => file?.size !== 0, "File is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 1mb.")
    .refine((file) => checkFileType(file), "Only .jpg, .jpeg, .png formats are supported."),
});

export const SignUpSchemaValidation = z.object({
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
  image: z
    .instanceof(File)
    .refine((file: File) => file?.size !== 0, "File is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "Max size file is 1mb.")
    .refine((file) => checkFileType(file), "Only .jpg, .jpeg, .png formats are supported."),
});

export const SignInSchemaValidation = z.object({
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
