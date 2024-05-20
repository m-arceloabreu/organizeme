'use client';
import Button from "@/components/molecules/button/Button";
import { signUpFormSchema } from "@/libs/validation/forms/signUpValidator";
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

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;


export default function SignUpForm() {
  const router = useRouter();

  

  const [pass, setPass] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema)
  });


  const onSubmit: SubmitHandler<SignUpFormSchema> = async (data: SignUpFormSchema) => {
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
    toast.error("Your password has to be strong");
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
      {errors.name?.message && <span>{errors.email?.message}</span>}

      <input
        {...register('email')}
        placeholder="email"
        name="email"
        id="email"
        disabled={isSubmitting}
        type="text" />
      {errors.email?.message && <span>{errors.email?.message}</span>}

      <input
        {...register('password')}
        placeholder="password"
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
        placeholder="confirmPassword"
        name="confirmPassword"
        id="confirmPassword"
        disabled={isSubmitting}
        type="password" />
        {errors.confirmPassword?.message && <span>{errors.confirmPassword.message}</span>}

      <Button variant='outlined' type="submit" disable={isSubmitting}
        label={!isSubmitting ? 'Sign in' : 'Signin in...'} />
    </form>
  );

}
