'use server'
import { ChangePasswordType, SignUpFormSchemaType, UpdateUserSchemaType } from '../../libs/validation/types';

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

export const signUp = async (signUpFormSchema: SignUpFormSchemaType) => {

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

export const updateUser = async (updateUserSchema: UpdateUserSchemaType, token: string) => {

    let result: {status: number, message: string} = { status: 0, message: ''};

    await fetch(`http://localhost:8080/api/v1/user/update`, {
        method: 'PUT',
        body: JSON.stringify({
            name: updateUserSchema.name,
            image: updateUserSchema.image,
            phoneNumber: updateUserSchema.phoneNumber
        }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((r) => {
        if(r.status === 200){

        result.status = 200
        result.message = 'User updated'

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

export const deleteUser = async ( token: string) => {

    let result: {status: number, message: string} = { status: 0, message: ''};

    await fetch(`http://localhost:8080/api/v1/user/deleteuser`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((r) => {
        if(r.status === 200){

        result.status = 200
        result.message = 'User deleted'

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

