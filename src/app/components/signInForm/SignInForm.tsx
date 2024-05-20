'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInFormSchema } from "@/libs/validation/forms/signInValidator";
import Button from "@/components/molecules/button/Button";
import { toast } from "sonner";

type LoginInputs = {
  email: string
  password: string
}

export default function SignInForm (){
  const router = useRouter();
    
    const { register, handleSubmit, formState: {errors, isSubmitting}, reset, setError } = useForm<LoginInputs>({
      defaultValues: {
        email:'',
        password:''
      },
      resolver: zodResolver(signInFormSchema),
    });


  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    const result = await signIn('credentials', {
           email: data.email,
           password: data.password,
           redirect: false,
         });
         if(result?.ok){
          toast.success("Loggin you in...");
          router.push('/user/profile');
          reset();
         }else{
          setError('root', {
            type:"server",
            message:"Invalid email or password"});
         }
       };



    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign In</h1>
          {errors.root?.message && <span>{errors.root.message}</span>}
          <input
            {...register('email')}
            placeholder="email@email.com"
            id="email"
            name="email"
            type="text"
            disabled={isSubmitting}
             />
             {errors.email?.message &&  <span>{errors.email.message}</span>}

          <input
            {...register('password')}
            placeholder="Password"
            name="password"
            id="password"
            disabled={isSubmitting}
            type="password"
          />
          {errors.password?.message &&  <span>{errors.password.message}</span>}

          <Button variant='outlined' type="submit" disable={isSubmitting}
          label={!isSubmitting ? 'Sign in' : 'Signin in...'}
          />
        </form>
        
        
        </>
    );
}