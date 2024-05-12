import Button from '@/components/molecules/button/Button';
import styles from './modalChangePassword.module.scss';
import ChangePasswordType from '@/components/types';
import { getToken } from 'next-auth/jwt';
import { useRef } from 'react';
import {changePassword} from '../../../apiHandlers/user/userApiHandler';
import { UserData } from 'next-auth/providers/42-school';
import { User } from 'next-auth';

export type ModalChangePasswordProps = {
  modalValue: boolean;
  token?: string;
  closeModal: () => void;
  user?: User;
};

export default function ModalChangePassword(props: ModalChangePasswordProps) {

  const currentPassword = useRef('');
  const newPassword = useRef('');
  const confirmNewPassword = useRef('');

  const changePasswordFunc = async () =>{
    const changePasswordObj:ChangePasswordType ={
      "currentPassword": currentPassword.current,
      "newPassword": newPassword.current,
      "confirmNewPassword": confirmNewPassword.current
    }

    if(props.token){
      await changePassword(changePasswordObj, props.token);
  }
}

  return (
    <>
      {props.modalValue && (
        <div className={styles.modal}>
          <div className={styles.overlay}>
            <div className={styles.modalContent}>
              <h2>Change Password </h2>
              <form>
                <label>Current Password</label>
                <input
                  className={styles.inputStyle}
                  placeholder="********"
                  type='password'
                  name='currentPassword'
                  onChange={(e) => (currentPassword.current = e.target.value)}
                ></input>
                <label>New Password</label>
                <input
                  className={styles.inputStyle}
                  placeholder="********"
                  name='newPassword'
                  type='password'
                  onChange={(e) => (newPassword.current = e.target.value)}
                ></input>
                <label>Confirm new Password</label>
                <input
                  className={styles.inputStyle}
                  placeholder="********"
                  type='password'
                  name='confirmNewPassword'
                  onChange={(e) => (confirmNewPassword.current = e.target.value)}
                ></input>
              </form>
              <Button
                variant="outlined"
                disable={false}
                cta={props.closeModal}
                label={`${'<'} Cancel`}
              />
              <Button
                variant="outlined"
                disable={false}
                cta={changePasswordFunc}
                label={` Confirm Change ${'>'}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
