"use client"
import Image from "next/image";
import Link from "next/link";
import stacklogo from "../assets/new_logo.png";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { usePathname } from 'next/navigation'
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
    const [isClick, setIsClick] = useState(false);
    const [profileClick, setProfileClick] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigation = usePathname();
  

    const { data: session } = useSession();





    const handleClick = () => {
        setIsClick(!isClick);
    };

    const handleProfileClick = () => {
        setProfileClick(!profileClick)
        setTimeout(() => {
            setProfileClick(false)
        }, 4000);
    }

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <nav className="">
            <div className={scrolled ? `fixed left-0 top-0  z-50 w-full flex h-[60px] bg-white  justify-start  ${isClick ? "md:shadow-lg" : "shadow-lg"}` : "fixed left-0 top-0  z-50 w-full flex h-[60px] bg-white  justify-startx"}>
                <Link loading={"lazy"} href="/" className="flex items-center flex-1 px-5 md:ml-20 w-auto h-auto">
                    <h1 className="font-serif font-bold text-lg text-blue-600">
                        💢 CodeVault
                    </h1>
                </Link>
                <ul className="flex flex-1 items-center justify-center gap-16 max-md:hidden text-sm font-semibold leading-6 text-gray-900">
                    <li className={navigation === '/' ? "text-red-700" : "text-gray-900"}>
                        <Link href="/" >
                            Home
                        </Link>
                    </li>
                    <li className={navigation === '/about' ? "text-red-700" : "text-gray-900"}>
                        <Link href="/about" >
                            About
                        </Link>
                    </li>
                    <li className={navigation === '/privacy' ? "text-red-700" : "text-gray-900"}>
                        <Link href="/privacy" >
                            Privacy
                        </Link>
                    </li>
                </ul>
                <div className="flex flex-1 items-center justify-end mr-20  gap-5 max-md:hidden ">
                    <div className="font-semibold text-red-600 text-sm">{session ? <span className="text-sm text-black">Wellcome </span> : ""}
                        <br />

                        {session?.user?.name}</div>


                    <AccountCircleOutlinedIcon onClick={handleProfileClick} />


                    {
                        profileClick &&
                        <div className={!session ? "absolute border border-b-3 shadow-lg px-5 py-2 mt-36 bg-white " : "absolute border border-b-3 shadow-lg px-5 py-2 mt-36 bg-white "}>
                            {session ? <ul className="flex flex-col gap-2">

                                {
                                    session?.user?.role == true &&
                                    <li className={navigation === '/stack' ? "text-red-700 cursor-pointer bg-blue-500 px-3 py-1 rounded-lg" : "text-gray-900 cursor-pointer bg-blue-500  px-3 py-1 rounded-lg"}>
                                        <Link href="/stack" >
                                            Add post
                                        </Link>
                                    </li>
                                }
                                <li onClick={() => signOut()} className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg">
                                    SignOut
                                </li>
                            </ul> :
                                <div className="text-white cursor-pointer bg-blue-700  px-3 py-1 rounded-lg">
                                    <Link href="/login" >
                                        Login
                                    </Link>
                                </div>}

                        </div>
                    }

                </div>
                <div className="flex flex-1 items-center justify-end  md:hidden px-5 " >
                    {isClick ? (
                        <Close

                            fontSize="large"
                            onClick={handleClick}
                            className="text-black cursor-pointer transition-transform transform hover:scale-110 "
                        />
                    ) : (
                        <MenuIcon
                            fontSize="large"
                            onClick={handleClick}
                            className="text-black cursor-pointer transition-transform transform hover:scale-110"
                        />
                    )}
                </div>
            </div>
            <div>
                {isClick && (
                    <div className="fixed w-full top-10 z-50 h-60 flex justify-center items-center bg-white shadow-lg  md:hidden " >

                        <ul className="flex gap-6 flex-col items-center text-sm font-semibold leading-6 text-gray-900">
                            <li className={navigation === '/' ? "text-red-700" : "text-gray-900"}>
                                <Link href="/" >
                                    Home
                                </Link>
                            </li>
                            <li className={navigation === '/about' ? "text-red-700" : "text-gray-900"}>
                                <Link href="/about" >
                                    About
                                </Link>
                            </li>
                            <li className={navigation === '/privacy' ? "text-red-700" : "text-gray-900"}>
                                <Link href="/privacy" >
                                    Privacy
                                </Link>
                            </li>
                            {session ?
                                <div className="flex flex-col text-center gap-6">
                                    <li onClick={() => signOut()} className="cursor-pointer">
                                        SignOut
                                    </li>

                                    {
                                        session?.user?.role == true &&
                                        <li className={navigation === '/stack' ? "text-red-700 " : "text-gray-900 "}>
                                            <Link href="/stack" >
                                                Add post
                                            </Link>
                                        </li>
                                    }
                                </div> :
                                <div className="flex flex-col">

                                    <li className={navigation === '/login' ? "text-red-700" : "text-gray-900"}>
                                        <Link href="/login" >
                                            Login
                                        </Link>
                                    </li>


                                </div>}

                        </ul>
                    </div>
                )}
            </div>
        </nav >
    );
};

export default Nav;
