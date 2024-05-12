'use client';
import { ReactNode, useState } from 'react';
import styles from './navbar.module.scss';
import hambMenu from '../../../../public/hamMenu.png';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

type NavItems = {
  label: string;
  path: string;
};


export default function Navbar() {
  const { status } = useSession();

  const [active, setActive] = useState('');

  const handleActive = () => {
    if (active != 'active') {
      setActive('active');
    } else {
      setActive('');
    }
  };

  const unauthorized: NavItems[] = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'About',
      path: '/about',
    },
    {
      label: 'Contact',
      path: '/contact',
    },
  ];
  const authorized: NavItems[] = [
    {
      label: 'Dashboard',
      path: '/user/dashboard',
    },
    {
      label: 'Profile',
      path: '/user/profile',
    },
  ];

  function handleMenuItems() {
    if (status === 'loading' || status === 'unauthenticated') {
      return (
        <>
          {unauthorized.map((item) => {
            return (
              <li key={item.label}>
                <Link href={item.path}>{item.label}</Link>
              </li>
            );
          })}
        </>
      );
    }
      return (
      <>
        {authorized.map((item) => {
          return (
            <li key={item.label}>
              <Link href={item.path}>{item.label}</Link>
            </li>
          );
        })}
      </>
    );
  }

  const handleSignButton = () => {
    if (status === 'loading' || status === 'unauthenticated') {
      return (
        <li className={styles.btnSign}>
          <Link href="/auth/signIn">Sign In </Link>
        </li>
      );
    }
    return (
      <li className={styles.btnSign}>
        <Link onClick={() => signOut()} href={'/'}>Sign Out</Link>
      </li>
    );
  };

  return (
    <div className={styles.bgColor}>
      <div className={styles.container}>
        <div className={styles.logoArea}>
          <span>Organize-me</span>
        </div>

        <div className={styles.nav}>
          <ul className={styles[`${active}`]}>
            {handleMenuItems()}
            {handleSignButton()}
          </ul>
        </div>
        <div className={styles.hambMenu} onClick={handleActive}>
          <Image src={hambMenu} alt="Navbar Menu" />
        </div>
      </div>
    </div>
  );
}
