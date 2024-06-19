import { z } from "zod";
import { MAX_FILE_SIZE, checkFileType } from "../../shared/utils/format-file";

export const NewPlaceSchemaValidation = z.object({
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
  lat: z.number({ invalid_type_error: "lat must be an expected number " }),
  lng: z.number({ invalid_type_error: "lng must be an expected number" }),
  image: z
    .instanceof(File)
    .refine((file: File) => file?.size !== 0, "File is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "Max size file is 1mb.")
    .refine((file) => checkFileType(file), "Only .jpg, .jpeg, .png formats are supported."),
});

export const UpdatePlaceSchema = z.object({
  title: z.string().min(1),
  description: z
    .string({
      required_error: "description is required",
    })
    .min(5, { message: "description must be at least 5 characters" }),
});
