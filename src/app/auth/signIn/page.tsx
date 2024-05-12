'use client';

import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRef } from 'react';
import styles from './signin.module.scss';
import SignInForm from '@/app/components/signInForm/SignInForm';

export default function SignIn() {
  const email = useRef('');
  const password = useRef('');

  const onSubmit = async () => {
    const result = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/user/dashboard',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <SignInForm/>
      </div>
    </div>
  );
}
