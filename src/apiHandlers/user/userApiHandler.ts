'use server'
import { HttpStatusCode } from 'axios';
import ChangePasswordType from '../../components/types';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

export const changePassword = async (changePassword: ChangePasswordType, token: string) => {
  
    await fetch(`http://localhost:8080/api/v1/user/changePassword`, {
        method: 'PATCH',
        body: JSON.stringify({
            currentPassword: changePassword.currentPassword,
            newPassword: changePassword.newPassword,
            confirmNewPassword: changePassword.newPassword
        }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((r) => {
       if(r.status === 202){
        return r.status;
       }
       else{
        console.log(r.status);
       }
    })
}