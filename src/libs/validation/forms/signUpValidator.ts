import { z } from "zod";


export const signUpFormSchema = z.object({
    email: z.string().email({message: 'An email is required'}),
    name: z.string()
            .min(5, {message: "Name is too low"})
            .max(15, {message:"I don't want to marry you, i just need your first name xD"}),
    password: z.string(),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
  });


