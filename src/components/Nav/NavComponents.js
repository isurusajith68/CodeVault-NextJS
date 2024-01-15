"use client"
import React from 'react'
import Nav from "./Nav"
import { usePathname } from 'next/navigation';



const NavComponents = () => {
    const navigation = usePathname();

    const showHeaderLogin = navigation === '/login' ? false : true;
    const showHeaderRegister = navigation === '/register' ? false : true;
    const Dashboard = navigation.startsWith('/admin') ? false : true;
    return (
        <div>

            {showHeaderLogin && showHeaderRegister && Dashboard && (
                <header className="">
                    <Nav />
                </header>
            )}
        </div>
    )
}
export default NavComponents