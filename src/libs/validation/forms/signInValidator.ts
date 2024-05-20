import {z } from 'zod';

export const signInFormSchema = z.object({
    email: z.string().email({message: 'An email is required'}),
    password: z.string().min(1, {message: "A Password is required"})
});