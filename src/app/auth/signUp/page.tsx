import SignUpForm from "@/app/components/signUpForm/SignUpForm";
import styles from './signUp.module.scss';
import woman2 from '../../../../public/woman2.jpg';
import ImageBanner from '@/components/imageBanner/ImageBanner';

export default function SingUp(){

    return(
      <div className={styles.container}>
      <ImageBanner imageSrc={woman2} imageAlt='Woman 2'/>
      <div className={styles.loginForm}>
        <SignUpForm/>
      </div>
    </div>
    );
}