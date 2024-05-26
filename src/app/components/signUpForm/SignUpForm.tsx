'use client';
import Button from "@/components/molecules/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from './signUpForm.module.scss';
import { useState } from "react";
import { z } from "zod";
import ComplexityBar from "@/components/molecules/ComplexityBar/ComplexityBar";
import { passwordStrength } from "check-password-strength";
import { signUp } from "@/apiHandlers/user/userApiHandler";
import { toast } from "sonner";
import { SignUpFormSchemaType } from "@/libs/validation/types";
import { signUpFormSchema } from "@/libs/validation/userValidations";
import Link from "next/link";




export default function SignUpForm() {
  const router = useRouter();

  

  const [pass, setPass] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema)
  });


  const onSubmit: SubmitHandler<SignUpFormSchemaType> = async (data: SignUpFormSchemaType) => {
    if(isValid){
      let result = await signUp(data);

      if(result.status === 200){
        console.log(result);
        toast.success('Account created');
        router.push('/auth/signIn');
      }
      else{
        toast.error("Error while creating your account");
      }
    }
  };

  return (
    <form className={styles.formStyle} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <input
        {...register('name')}
        placeholder="Name"
        id="name"
        name="name"
        type="text"
        disabled={isSubmitting} />
      {errors.name?.message && <span>{errors.name?.message}</span>}

      <input
        {...register('email')}
        placeholder="Email"
        name="email"
        id="email"
        disabled={isSubmitting}
        type="text" />
      {errors.email?.message && <span>{errors.email?.message}</span>}

      <input
        {...register('password')}
        placeholder="Password"
        name="password"
        id="password"
        disabled={isSubmitting}
        type="password"
        onChange={(e) => 
          setPass(e.target.value)}/>
        <ComplexityBar 
              password={pass}
              isValid = {isValid}
              setValidation={setIsValid}
              />

      <input
        {...register("confirmPassword")}
        placeholder="Confirm Password"
        name="confirmPassword"
        id="confirmPassword"
        disabled={isSubmitting}
        type="password" />
        {errors.confirmPassword?.message && <span>{errors.confirmPassword.message}</span>}

      <button  type="submit" disabled={isSubmitting}
        >{!isSubmitting ? 'Sign up' : 'Signin up...'}</button>
      <p>Already registered?<Link href="/auth/signIn"> Sign in!</Link></p>
    </form>
  );

}
