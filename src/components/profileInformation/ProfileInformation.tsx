'use client'
import { SyntheticEvent, useState } from 'react';
import styles from './profileInformation.module.scss';
import { ProfileSidebarType } from '../profileSidebar/ProfileSidebar';
import Image from 'next/image';
import editProfile from '../../../public/edit-button.png';
import ModalChangePassword from './ModalChangePassword/ModalChangePassword';
import Button from '../molecules/button/Button';
import { User } from 'next-auth';


type ProfileInformationProps = {
  user?: User;
  token?: string;
};

export default function ProfileInformation(props: ProfileInformationProps) {
  const user = props.user;

  const [disable, setDisable] = useState(true);
  const [modalOpener, setModalOpener] = useState(false);

  const handleEdit = (event: SyntheticEvent) => {
    disable === false ? setDisable(true) : setDisable(false);
  };

  const handlePasswordChange = () => {
    //open modal
    if (modalOpener === false) {
      setModalOpener(true);
    }
  };
  const handleModalCloser = () => {
    if (modalOpener) {
      setModalOpener(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Profile Information</h2>
        <Image src={editProfile} alt="edit Profile" onClick={handleEdit} />
      </div>

      <form>
        <label>Email</label>
        <input
          disabled={true}
          className={styles.inputStyle}
          placeholder={user?.email}
        ></input>
        <label>Name</label>
        <input
          disabled={disable}
          className={styles.inputStyle}
          placeholder={user?.name}
        ></input>
        <label>WhatsApp Number</label>
        <input
          disabled={disable}
          className={styles.inputStyle}
          type="text"
          placeholder={'(XX)X XXXX-XXXX'}
        ></input>
        <label>Image</label>
        <input
          disabled={disable}
          className={styles.inputStyle}
          placeholder="image"
        ></input>
        <Button label="Submit Button" variant="outlined" disable={disable} />
      </form>
      <Button
        label="Change password"
        variant="filled"
        disable={false}
        cta={handlePasswordChange}
      />

      <ModalChangePassword
        user={props?.user}
        token={props.token}
        modalValue={modalOpener}
        closeModal={handleModalCloser}
      />
      <Button label="Delete Account" variant="alert" disable={disable} />
    </div>
  );
}
