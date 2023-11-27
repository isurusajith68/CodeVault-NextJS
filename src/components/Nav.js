"use client"
import Image from "next/image";
import Link from "next/link";
import stacklogo from "../assets/stacklogo.png";
import React, { useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";

const Nav = () => {
    const [isClick, setIsClick] = useState(false);

    const handleClick = () => {
        setIsClick(!isClick);
    };




    return (
        <nav className="">
            <div className="sticky top-0 z-auto w-full flex h-[60px] bg-white  justify-start  ">
                <div className="flex items-center flex-1 px-5 md:ml-20">
                    <Image alt="" src={stacklogo} width={50} height={50} />
                </div>
                <ul className="flex flex-1 items-center justify-center gap-16 max-md:hidden text-sm font-medium leading-6 text-gray-900">
                    <li className="">
                        <Link href="/" >
                            Home
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/about" >
                            About
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/privacy" >
                            Privacy
                        </Link>
                    </li>
                </ul>
                <div className="flex flex-1 items-center justify-end mr-20 gap-5 max-md:hidden">
                    <button className="px-5 py-1 rounded-lg text-white font-medium bg-indigo-600 ">
                        Login
                    </button>
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
                    <div className="w-full h-52 flex justify-center items-center bg-white shadow-lg  md:hidden " >

                        <ul className="flex gap-6 flex-col items-center text-sm font-medium leading-6 text-gray-900">
                            <li className="">
                                <Link href="/" >
                                    Home
                                </Link>
                            </li>
                            <li className="">
                                <Link href="/about" >
                                    About
                                </Link>
                            </li>
                            <li className="">
                                <Link href="/privacy" >
                                    Privacy
                                </Link>
                            </li>
                            <li className="font-bold">
                                <Link href="/login" >
                                    Login
                                </Link>
                            </li>

                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
