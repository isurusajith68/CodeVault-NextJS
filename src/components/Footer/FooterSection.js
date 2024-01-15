"use client"
import React from 'react'
import Footer from "./Footer"
import { usePathname } from 'next/navigation';

const FooterSection = () => {

    const navigation = usePathname();

    const showHeaderLogin = navigation === '/login' ? false : true;
    const showHeaderRegister = navigation === '/register' ? false : true;
    const Dashboard = navigation.startsWith('/admin') ? false : true;

  return (
    <div>
          {showHeaderLogin && showHeaderRegister && Dashboard && (
              <div>
                  <Footer />
              </div>
          )}
    </div>
  )
}
export default FooterSection