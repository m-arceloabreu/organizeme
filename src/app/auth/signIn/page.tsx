'use client';

import ImageBanner from '@/components/imageBanner/ImageBanner';
import styles from '../signIn/signIn.module.scss';
import woman2 from '../../../../public/woman2.jpg';
import SignInForm from '@/app/components/signInForm/SignInForm';

export default function SignIn() {

  return (
    <div className={styles.container}>
      <ImageBanner imageSrc={woman2} imageAlt='Woman 2'/>
      <div className={styles.loginForm}>
        <SignInForm/>
      </div>
    </div>
  );
}
