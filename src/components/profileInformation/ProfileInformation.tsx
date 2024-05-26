'use client';
import { SyntheticEvent, useState } from 'react';
import styles from './profileInformation.module.scss';
import Image from 'next/image';
import editProfile from '../../../public/edit-button.png';
import ModalChangePassword from './ModalChangePassword/ModalChangePassword';
import { User } from 'next-auth';
import { UpdateUserSchemaType } from '@/libs/validation/types';
import { updateUserSchema } from '@/libs/validation/userValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { deleteUser, updateUser } from '@/apiHandlers/user/userApiHandler';
import { toast } from 'sonner';
import Router from 'next/router';

type ProfileInformationProps = {
  user: User;
  token?: string;
};

export default function ProfileInformation(props: ProfileInformationProps) {
  const user = props?.user;

  const [disable, setDisable] = useState(true);
  const [modalOpener, setModalOpener] = useState(false);

  const handleEdit = (event: SyntheticEvent) => {
    disable === false ? setDisable(true) : setDisable(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
  });

  const handleDelete = async () => {
    if (props.token) {
      let result = await deleteUser(props.token);

      if (result.status === 200) {
        toast.success(result.message);
        Router.push('/');
      } else {
        toast.error(result.message);
      }
    }
  };

  const onSubmit: SubmitHandler<UpdateUserSchemaType> = async (
    data: UpdateUserSchemaType
  ) => {
    console.log('cheguei aqui');

    if (props.token) {
      let result = await updateUser(data, props?.token);
      if (result.status === 200) {
        toast.success('User updated');
      } else {
        toast.error('Error message');
      }
    }
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

      <form className={styles.formUpdate} onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          disabled={true}
          type='text'
          placeholder={user?.email}
        />
        <label>Name</label>
        <input
          {...register('name')}
          disabled={disable}
          required={false}
          type='text'
          placeholder={user?.name}
        />
        {errors.name?.message && <span>{errors.name?.message}</span>}

        <label>WhatsApp Number</label>
        <input
          {...register('phoneNumber')}
          disabled={disable}
          required={false}
          type="text"
          placeholder={"Phone Number"}
        />
        {errors.phoneNumber?.message && (
          <span>{errors.phoneNumber?.message}</span>
        )}

        <label>Image</label>
        <input
          {...register('image')}
          className={styles.input}
          disabled={disable}
          required={false}
          placeholder="image"
          type='text'
        />
        {errors.image?.message && <span>{errors.image?.message}</span>}

        <button type="submit" disabled={disable}>
          {!isSubmitting ? 'Update user' : 'Updating'}{' '}
        </button>
      </form>

      <button disabled={false} className={styles.changePass} onClick={handlePasswordChange}>
        Change password
      </button>

      <ModalChangePassword
        user={props?.user}
        token={props.token}
        modalValue={modalOpener}
        closeModal={handleModalCloser}
      />
      <button className={styles.deleteAcc} disabled={disable} onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
}
