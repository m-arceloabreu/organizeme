'use client'

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRef } from "react";


export default function SignInForm (){
    
    const email = useRef('');
    const password = useRef('');
  
    const onSubmit = async () => {
      const result = await signIn('credentials', {
        email: email.current,
        password: password.current,
        redirect: true,
        callbackUrl:'/user/dashboard'
      });
    };

    return(
        <>
        <form>
          <h1>Sign In</h1>
          <input
            placeholder="email@email.com"
            name="email"
            type="text"
            onChange={(e) => (email.current = e.target.value)}
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={(e) => (password.current = e.target.value)}
          />
        </form>
        <button onClick={onSubmit}>Sign In</button>
        </>
    );
}