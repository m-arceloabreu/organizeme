import {z } from 'zod';

export const signInFormSchema = z.object({
    email: z.string().email({message: 'An email is required'}),
    password: z.string().min(1, {message: "A Password is required"})
});

export const signUpFormSchema = z.object({
    email: z.string().email({message: 'An email is required'}),
    name: z.string()
            .min(2, {message: "Name is too low"})
            .max(15, {message:"I don't want to marry you, i just need your first name xD"}),
    password: z.string(),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
  });

  export const updateUserSchema = z.object({
    name: z.string()
            .min(2, {message: "Name is too low"})
            .max(15, {message:"I don't want to marry you, i just need your first name xD"})
            .optional(),
    image: z.string()
            .min(3)
            .startsWith('https://', {message: "It has to start with https://"})
            .optional(),
    phoneNumber: z.string()
            .min(11)
            .max(11)
            .optional()
  })


