import "./page-template.scss"
import AuthProvider from './context/AuthProvider'
import Navbar from './components/navbar/Navbar'
import { Toaster } from "sonner"

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
        <AuthProvider>
      <body>
        <Toaster position="top-right" richColors/>
          <Navbar />
          <main>
            {children}
          </main>
      </body>
        </AuthProvider>
    </html>
  );
}