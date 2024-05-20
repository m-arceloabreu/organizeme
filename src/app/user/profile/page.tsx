
import { redirect } from 'next/navigation'
import ProfileSidebar from '@/components/profileSidebar/ProfileSidebar'
import ProfileInformation from '@/components/profileInformation/ProfileInformation'
import styles from './profile.module.scss';
import { User, getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Suspense } from 'react';

export default async  function  Profile() {

    const session = await getServerSession(options);
    const user = session?.user;

    if(!session){
        redirect('/auth/signIn');
    }
    return (
        <div className={styles.container}>
            {/* <Suspense fallback={<div>loading ...</div>}> */}
            <div className={styles.sidebar}>
            <ProfileSidebar user= {session?.user}/>
            </div>
            <div className={styles.information}>
             <ProfileInformation user= {session?.user} token= {session?.user.token}/>
             
            </div>
            {/* </Suspense> */}
        </div>
    )
}