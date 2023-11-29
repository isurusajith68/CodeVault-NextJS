"use client"
import Nav from "../components/Nav"
import './globals.css'
import Footter from "../components/Footter"
import { usePathname } from 'next/navigation'
import { Toaster } from "react-hot-toast"
import { GoogleAnalyticsTracking } from "@/components/GoogleAnalyticsTracking "


export default function RootLayout({ children }) {
  const navigation = usePathname();

  const showHeaderLogin = navigation === '/login' ? false : true;
  const showHeaderRegister = navigation === '/register' ? false : true;

  return (
    <html lang="en">
      <GoogleAnalyticsTracking  />
      <body className="">
        {showHeaderLogin && showHeaderRegister && (
          <header>
            <Nav />
          </header>
        )}

        <div className="md:px-24 px-5 py-1 ">
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


      </body>
    </html>
  )
}
