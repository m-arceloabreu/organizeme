
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ProfileSidebar from '@/components/profileSidebar/ProfileSidebar'
import ProfileInformation from '@/components/profileInformation/ProfileInformation'
import styles from './profile.module.scss';
import { User, getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async  function  Profile() {

    // const { data: session } = useSession({     
    //     required: true,
    //     onUnauthenticated() {
    //         redirect('/api/auth/signin?callbackUrl=/profile')
    //     }
    // })

    const session = await getServerSession(options);
    console.log(session);
    const user = session?.user;

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
            <ProfileSidebar user= {session?.user}></ProfileSidebar>
            </div>
            <div className={styles.information}>
             <ProfileInformation user= {session?.user} token= {session?.user.token}/>
            </div>
        </div>
    )
}