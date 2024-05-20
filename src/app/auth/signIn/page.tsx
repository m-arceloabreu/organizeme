'use client';

import styles from '../signIn/signIn.module.scss';
import SignInForm from '@/app/components/signInForm/SignInForm';

export default function SignIn() {

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <SignInForm/>
      </div>
    </div>
  );
}
