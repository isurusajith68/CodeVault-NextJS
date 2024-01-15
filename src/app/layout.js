import './globals.css'
import { GoogleAnalyticsTracking } from "../components/GoogleAnalyticsTracking "
import { AuthProvider } from "./Provider"
import ScrollBtn from "../components/ScrollBtn"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaTag from "../components/MetaTag"
import FooterComponent from "../components/Footer/FooterSection"
import NavComponent from "../components/Nav/NavComponents"


export const metadata = {
  title: 'Code Vault™️',
  description: 'Code Vault™️ is a place where you can store your code snippets and share them with the world.',
}

export default function RootLayout({
  children,
}) {



  return (
    <html lang="en">
      <MetaTag />
      <GoogleAnalyticsTracking />
      <body className="">
        <AuthProvider>
          <NavComponent />
          <div className="md:px-32 px-2 py-1 min-h-screen bg-slate-100 ">
            <ToastContainer />
            {children}
            <ScrollBtn />
          </div>
          <FooterComponent />
        </AuthProvider>
      </body>
    </html>
  )
}
