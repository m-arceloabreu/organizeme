
import { redirect } from 'next/navigation'
import ProfileInformation from '@/components/profileInformation/ProfileInformation'
import styles from './profile.module.scss';
import { User, getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Suspense } from 'react';

export default async  function  Profile() {

    const session = await getServerSession(options);
    

    if(!session){
        redirect('/auth/signIn');
    }
    return (
        <div className={styles.container}>
            <div className={styles.information}>
             { (session && session.user) &&
                <ProfileInformation user = {session.user} token= {session?.user.token}/>}
            </div>
        </div>
    )
}