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
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Code Vault</title>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZW3SBNYYSF"></script>
        <script
          dangerouslySetInnerHTML={{
            _html: ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZW3SBNYYSF');`
          }}

        />
      </Head>
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
