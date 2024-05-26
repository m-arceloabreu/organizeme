'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInFormSchema } from "@/libs/validation/userValidations";
import styles from './signInForm.module.scss';

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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formSignIn}>
          <h1>Login to Your Account!</h1>
          {errors.root?.message && <span>{errors.root.message}</span>}

          <div className={styles.inputGroup}>
            <label>Email</label>
          <input
            {...register('email')}
            placeholder="Enter your email"
            id="email"
            name="email"
            type="text"
            disabled={isSubmitting}
             />
             {errors.email?.message &&  <span>{errors.email.message}</span>}
          </div>
          <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            {...register('password')}
            placeholder="Password"
            name="password"
            id="password"
            disabled={isSubmitting}
            type="password"
          />
          {errors.password?.message &&  <span>{errors.password.message}</span>}
          </div>
          <button type="submit" disabled={isSubmitting}
          >
          {!isSubmitting ? 'Sign in' : 'Signin in...'}
        </button>
        </form>
        
        
        </>
    );
}