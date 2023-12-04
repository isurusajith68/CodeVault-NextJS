"use client"
import Nav from "../components/Nav"
import './globals.css'
import Footter from "../components/Footter"
import { usePathname } from 'next/navigation'
import { Toaster } from "react-hot-toast"
import { GoogleAnalyticsTracking } from "@/components/GoogleAnalyticsTracking "
import { AuthProvider } from "./Provider"


export default function RootLayout({ children }) {
  const navigation = usePathname();

  const showHeaderLogin = navigation === '/login' ? false : true;
  const showHeaderRegister = navigation === '/register' ? false : true;

  return (
    <html lang="en">
      <GoogleAnalyticsTracking />
      <body className="">
        <AuthProvider>

          {showHeaderLogin && showHeaderRegister && (
            <header>
              <Nav />
            </header>
          )}

          <div className="md:px-24 px-5 py-1 h-full">
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            {children}
          </div>

          {showHeaderLogin && showHeaderRegister && (
            <div>
              <Footter />
            </div>
          )}
        </AuthProvider>


      </body>
    </html>
  )
}
