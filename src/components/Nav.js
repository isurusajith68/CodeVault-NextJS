"use client"
import Image from "next/image";
import Link from "next/link";
import stacklogo from "../assets/new_logo.png";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { usePathname } from 'next/navigation'

const Nav = () => {
    const [isClick, setIsClick] = useState(false);
    const [profileClick, setProfileClick] = useState(false);
    const [userdata, setUserData] = useState(null);
    const navigation = usePathname();

    const handleClick = () => {
        setIsClick(!isClick);
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userdata"))
        setUserData(user)
    }, [])


    const handleProfileClick = () => {
        setProfileClick(!profileClick)
        setTimeout(() => {
            setProfileClick(false)
        }, 4000);
    }

    const signOut = () => {
        localStorage.removeItem("userdata")
        // router.push("/login")
        setUserData(null)

    }
    return (
        <nav className="">
            <div className="sticky left-0 top-0 z-auto w-full flex h-[60px] bg-white  justify-start  md:shadow-lg">
                <Link loading={"lazy"} href="/" className="flex items-center flex-1 px-5 md:ml-20 w-auto h-auto">
                    <h1 className="font-serif font-bold text-lg text-blue-600">
                        💢 CodeVault
                    </h1>
                </Link>
                <ul className="flex flex-1 items-center justify-center gap-16 max-md:hidden text-sm font-medium leading-6 text-gray-900">
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
                <div className="flex flex-1 items-center justify-end mr-20  gap-5 max-md:hidden">
                    <div className="font-semibold text-red-600 text-sm">{userdata ? <span className="text-sm text-black">Wellcome </span> : ""}
                        <br />
                        {userdata ? userdata.username : ""}</div>
                    <AccountCircleOutlinedIcon


                        onClick={handleProfileClick}
                        className="text-gray-900 text-xl   cursor-pointer transition-transform transform hover:scale-110 "
                    />
                    {
                        profileClick &&
                        <div className={!userdata ? "absolute border border-b-3 shadow-lg px-5 py-2 mt-24 bg-white " : "absolute border border-b-3 shadow-lg px-5 py-2 mt-32 bg-white "}>
                            {userdata ? <ul className="flex flex-col gap-2">

                                {
                                    userdata.isAdmin == true &&
                                    <li className={navigation === '/stack' ? "text-red-700 cursor-pointer bg-blue-500 px-3 py-1 rounded-lg" : "text-gray-900 cursor-pointer bg-blue-500  px-3 py-1 rounded-lg"}>
                                        <Link href="/stack" >
                                            Add post
                                        </Link>
                                    </li>
                                }
                                <li onClick={signOut} className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg">
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
                    <div className="w-full h-60 flex justify-center items-center bg-white shadow-lg  md:hidden " >

                        <ul className="flex gap-6 flex-col items-center text-sm font-medium leading-6 text-gray-900">
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
                            {userdata ?
                                <div className="flex flex-col text-center gap-6">
                                    <li onClick={signOut} className="cursor-pointer">
                                        SignOut
                                    </li>

                                    {
                                        userdata.isAdmin == true &&
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
