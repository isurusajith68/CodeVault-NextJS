"use client"
import Nav from "../components/Nav/Nav"
import './globals.css'
import Footer from "../components/Footer"
import { usePathname } from 'next/navigation'
import { GoogleAnalyticsTracking } from "../components/GoogleAnalyticsTracking "
import { AuthProvider } from "./Provider"
import ScrollBtn from "../components/ScrollBtn"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaTag from "../components/MetaTag"

export default function RootLayout({
  children,
}) {


  const navigation = usePathname();

  const showHeaderLogin = navigation === '/login' ? false : true;
  const showHeaderRegister = navigation === '/register' ? false : true;
  const Dashboard = navigation.startsWith('/admin') ? false : true;

  return (
    <html lang="en">
      <MetaTag />
      <GoogleAnalyticsTracking />
      <body className="">
        <AuthProvider>

          {showHeaderLogin && showHeaderRegister && Dashboard && (
          <header className="">
            <Nav />
          </header>
          )}

          <div className="md:px-32 px-2 py-1 min-h-screen bg-slate-100 ">
            <ToastContainer />
            {children}
            <ScrollBtn />
          </div>

          {showHeaderLogin && showHeaderRegister && Dashboard &&(
          <div>
            <Footer />
          </div>
          )}
        </AuthProvider>


      </body>
    </html>
  )
}
