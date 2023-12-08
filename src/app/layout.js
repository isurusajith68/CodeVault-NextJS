"use client"
import Nav from "../components/Nav"
import './globals.css'
import Footter from "../components/Footter"
import { usePathname } from 'next/navigation'
import { Toaster } from "react-hot-toast"
import { GoogleAnalyticsTracking } from "@/components/GoogleAnalyticsTracking "
import { AuthProvider } from "./Provider"
import Header from "@/components/Header"
import ScrollBtn from "@/components/ScrollBtn"


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
            <header className="">
              <Nav />
            </header>
          )}

          <div className="md:px-32 px-10 py-1 min-h-screen bg-slate-100 ">
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            {children}
            <ScrollBtn />
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
