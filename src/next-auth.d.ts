import NextAuth from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'
import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			name: string,
			email: string,
			token: string
			role: string
		} & DefaultSession
	}

	interface User extends DefaultUser{
			id: string
			name: string,
			email: string,
			image?: string,
			phoneNumber?: string
			token: string,
			role: string,
		role: string,
	}
}
