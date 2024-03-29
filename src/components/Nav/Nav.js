"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { usePathname } from 'next/navigation'
import { signOut, useSession } from "next-auth/react";
import stackLogo from "../../../public/assets/logo.jpg"
import { motion } from "framer-motion";
import ProfileImageGenerator from "../ProfileImage";

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
        }, 8000);
    }

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 80;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }


    return (
        <nav className="bg-white">
            <div className="fixed w-full top-0 left-0 z-50">
                {/* <div className="max-md:hidden w-full z-50 h-[64px] flex items-center justify-center bg-white border-b border-gray-200">
                    <Link loading={"lazy"} href="/" className="flex items-center justify-center   md:ml-20 w-auto h-auto">
                        <h1 className="font-serif font-bold text-2xl  text-slate-500">
                            Code Vault™️
                        </h1>
                    </Link>
                </div> */}
                <div className={scrolled ? `w-full flex h-[60px] bg-white  justify-start  ${isClick ? "md:shadow-lg" : "shadow-lg"}` : ` w-full flex h-[60px] bg-white  justify-start  ${isClick ? "md:shadow-lg" : ""}`}>

                    <div className="flex flex-auto w-[25%] items-center justify-center   gap-5 max-md:hidden ">
                        <Link loading={"lazy"} href="/" className="  ">
                            {/* <h1 className="flex items-center  h-[60px] px-3 justify-start  font-serif font-bold text-xl  text-slate-500">
                                Code Vault™️
                            </h1> */}
                            <Image src={stackLogo} width={100} height={90} alt="stack-logo" />
                        </Link>
                    </div>
                    <ul className="flex-auto w-[55%] flex items-center justify-center gap-16 max-md:hidden text-sm font-semibold leading-6 text-gray-400">
                        <li onClick={scrollToTop} className={navigation === '/' || navigation.startsWith('/post/') ? "text-white px-2 py-1 rounded-md  bg-red-500" : "text-black"}>
                            <Link href="/" >
                                Home
                            </Link>
                        </li>
                        <li onClick={scrollToTop} className={navigation === '/doc' ? "text-white px-2 py-1 rounded-md  bg-red-500" : "text-black"}>
                            <Link href="/doc" >
                                Document
                            </Link>
                        </li>
                        <li onClick={scrollToTop} className={navigation === '/about' ? "text-white px-2 py-1 rounded-md  bg-red-500" : "text-black"}>
                            <Link href="/about" >
                                About
                            </Link>
                        </li>
                        <li onClick={scrollToTop} className={navigation === '/privacy' ? "text-white px-2 py-1 rounded-md  bg-red-500" : "text-black"}>
                            <Link href="/privacy" >
                                Privacy
                            </Link>
                        </li>

                    </ul>
                    <div className="flex flex-auto w-[25%] items-center justify-center   gap-5 max-md:hidden ">
                        <div className="font-semibold text-red-500 text-sm">{session ? <span className="text-sm text-black">Hello </span> : ""}


                            {session?.user?.name}</div>

                        {

                            session?.user?.name ?
                                <div onClick={handleProfileClick} className="cursor-pointer">
                                    <ProfileImageGenerator username={session?.user?.name} width={"30px"} height={"30px"} color={"red"} />
                                </div>
                                : <AccountCircleOutlinedIcon onClick={handleProfileClick} className="text-black" />
                        }
                        {/* <ProfileImageGenerator username={} width={"30px"} height={"30px"} color={"red"} /> */}




                        {
                            profileClick &&
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className={!session?.user?.role === true ? "absolute border border-b-3 shadow-lg px-5 py-2 mt-28 bg-white " : "absolute border border-b-3 shadow-lg px-5 py-2 mt-36 bg-white "}>
                                {session ? <ul className="flex flex-col gap-2">

                                    {
                                        session?.user?.role == true &&
                                        <li className={navigation === '/admin' ? "text-red-700 cursor-pointer bg-blue-500 px-3 py-1 rounded-lg" : "text-gray-900 cursor-pointer bg-blue-500  px-3 py-1 rounded-lg"}>
                                            <Link href="/admin" >
                                                Dashboard
                                            </Link>
                                        </li>
                                    }
                                    <li onClick={() => signOut()} className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg">
                                        SignOut
                                    </li>
                                </ul> :
                                    <>
                                        <div className="text-white cursor-pointer bg-blue-700  px-3 py-1 rounded-lg">
                                            <Link href="/login" >
                                                Login
                                            </Link>
                                        </div>
                                        {/* <div className="text-white cursor-pointer mt-1  bg-blue-700  px-3 py-1 rounded-lg">
                                            <Link href="/register" >
                                              Register
                                            </Link>
                                        </div> */}
                                    </>}

                            </motion.div>
                        }

                    </div>
                    <Link href="/" className="flex flex-1 items-center justify-start  md:hidden px-5 ">
                        <Image src={stackLogo} width={100} height={90} alt="stack-logo" />
                    </Link>
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

            </div>
            <div>
                {isClick && (
                    <div className={scrolled ? `fixed w-full mt-[60px]  z-50 h-72 flex justify-center items-center bg-white shadow-lg  md:hidden ` : "fixed  mt-[60px] w-full z-50 h-72 flex justify-center items-center bg-white shadow-lg  md:hidden"} >

                        <ul className="uppercase flex gap-6 flex-col items-center text-sm font-semibold leading-6 text-gray-900 ">
                            <li className={navigation === '/' ? "text-red-700" : "text-gray-900"}>
                                <Link href="/" >
                                    Home
                                </Link>
                            </li>
                            <li className={navigation === '/doc' ? "text-red-700" : "text-gray-900"}>
                                <Link href="/doc" >
                                    Document
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
                                        <li className={navigation === '/admin' ? "text-red-700 " : "text-gray-900 "}>
                                            <Link href="/admin" >
                                                Dashboard
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
