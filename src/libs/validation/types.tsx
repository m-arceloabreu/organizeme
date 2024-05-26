import { z } from "zod";
import { signInFormSchema, signUpFormSchema, updateUserSchema } from "./userValidations";
import { updateUser } from "@/apiHandlers/user/userApiHandler";

export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default ChangePasswordType;

export type SignInFormSchemaType = z.infer<typeof signInFormSchema>

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>