'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Dashboard() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/dashboard')
        }
    })

    return <h1 className="text-5xl">Dashboard Page!</h1>

}