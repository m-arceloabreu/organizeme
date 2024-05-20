'use server'
import { HttpStatusCode } from 'axios';
import ChangePasswordType from '../../components/types';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { signUpFormSchema } from '@/libs/validation/forms/signUpValidator';
import { SignUpFormSchema } from '@/app/components/signUpForm/SignUpForm';

export const changePassword = async (changePassword: ChangePasswordType, token: string) => {

    let result: {status: number, message: string} = { status: 0, message: ''};
  
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

        result.status = 202
        result.message = 'Password changed'

        return result;
       }
       else{
        result.status = 400
        result.message = 'Error'
        return result;
       }
    })
    return result;
}


export const signUp = async (signUpFormSchema: SignUpFormSchema) => {

 let result: {status: number, message: string} = { status: 0, message: ''};

  await fetch(`http://localhost:8080/api/v1/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({
            name: signUpFormSchema.name,
            email: signUpFormSchema.email,
            password: signUpFormSchema.password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((r) => {
       if(r.status === 200){

        result.status = 200
        result.message = 'User created'

        return result;
       }
       else{
        result.status = 400
        result.message = 'Error'
        return result;
       }
    });

    return result;
}