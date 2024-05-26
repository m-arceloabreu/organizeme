'use client';
import { useEffect, useState } from 'react';
import styles from './navbar.module.scss';
import { signOut, useSession } from 'next-auth/react';
import NavLinks from './navLinks/NavLinks';
import Link from 'next/link';

export default function Navbar() {
  const { status } = useSession();

  const [active, setActive] = useState('');
  const [visible, setVisible] = useState('');

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setVisible('transparent')
      } else {
        setVisible('colored');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  const handleActive = () => {
    if (active != 'active') {
      setActive('active');
    } else {
      setActive('');
    }
  };



  const handleBtnGroup = () => {
    if (status === 'loading' || status === 'unauthenticated') {
      return (
        <div className={styles.btnGroup}>
            <Link  className={styles.btnSignIn} onClick={() => setActive} href="/auth/signIn">Sign In </Link>
            <Link className={styles.btnSignUp} href="/auth/signUp">Sign up for free </Link>

        </div>
      );
    }
    return (
      <div className={styles.btnGroup}>
          <Link className={styles.btnSignUp} onClick={() => {signOut(); setActive}} href={'/'}>
            Sign Out
          </Link>
      </div>
    );
  };

  return (
    <div className={`${styles.bgColor} ${styles[`${visible}`]}`}>
      <div className={styles.logoArea}>
        <p>Organize.me</p>
      </div>

      <ul
        id="hambmenu"
        className={`${styles['hambMenu']} ${styles[`${active}`]}`}
        onClick={handleActive}
      >
        <li className={styles.one} />
        <li className={styles.hidden} />
        <li className={styles.hidden} />
        <li className={styles.two} />
      </ul>
      <div className={`${styles['menu']} ${styles[`${active}`]}`}>
        <NavLinks logged={status} />
        {handleBtnGroup()}
      </div>
    </div>
  );
}
