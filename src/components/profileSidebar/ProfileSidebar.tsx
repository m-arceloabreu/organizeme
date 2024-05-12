import userImage from '../../../public/profile-avatar.png';
import Image from 'next/image';
import styles from './profileSidebar.module.scss';
import { JWT } from 'next-auth/jwt';
import { Session, User } from 'next-auth';

export type ProfileSidebarType = {
  user?: User;
};

export default function ProfileSidebar(props: ProfileSidebarType) {
  const user = props.user;
  const defaultImage = userImage;

  return (
    <div className={styles.sidebar}>
      <div className={styles.image}>
        <Image width={250} height={250} src={defaultImage} alt="profile image" />
        <div className={styles.information}>
        <h3>Hello, {user?.name}</h3>
        
        </div>
      </div>
    </div>
  );
}
