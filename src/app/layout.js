"use client"
import Nav from "../components/Nav"
import './globals.css'
import Footter from "../components/Footter"
import { usePathname } from 'next/navigation'
import { Toaster } from "react-hot-toast"
import Head from "next/head"


export default function RootLayout({ children }) {
  const navigation = usePathname();

  const showHeaderLogin = navigation === '/login' ? false : true;
  const showHeaderRegister = navigation === '/register' ? false : true;

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="UPy462P0DpuVDRDP4ssOZrxL4V6swsQ63HLf-xKXnyM" />
      </head>
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
