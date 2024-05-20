import SignUpForm from "@/app/components/signUpForm/SignUpForm";
import styles from './signUp.module.scss';
export default function SingUp(){

    return(
        <div className={styles.container}>
        <div className={styles.formGroup}>
          <SignUpForm/>
        </div>
      </div>
    );
}