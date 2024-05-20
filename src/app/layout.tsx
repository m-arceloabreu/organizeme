import "./page-template.scss"
import AuthProvider from './context/AuthProvider'
import Navbar from './components/navbar/Navbar'
import { useSession } from "next-auth/react"
import { Toaster } from "sonner"
import { getServerSideProps } from "next/dist/build/templates/pages"

export const metadata = {
  title: 'Organize.me',
  description: 'created by Marcelo Abreu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" richColors/>
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}