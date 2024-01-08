"use client"
import Nav from "../components/Nav"
import './globals.css'
import Footter from "../components/Footter"
import { usePathname } from 'next/navigation'
import { GoogleAnalyticsTracking } from "@/components/GoogleAnalyticsTracking "
import { AuthProvider } from "./Provider"
import ScrollBtn from "@/components/ScrollBtn"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            <ToastContainer />
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
