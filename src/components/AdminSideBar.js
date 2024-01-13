"use client"

import Image from "next/image"
import Link from "next/link"
import admin from "../../public/assets/admin.jpg"
import { MdSpaceDashboard } from "react-icons/md"
import { BsFilePost, } from "react-icons/bs"
import { IoDocumentText } from "react-icons/io5"
import { FaSignOutAlt, FaUserCheck } from "react-icons/fa"
import { IoIosSettings } from "react-icons/io"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
const AdminSideBar = () => {
    const { data: session } = useSession()

    const navigation = usePathname()

    return (
        <aside>
            <div className="max-md:hidden w-64 max-h-[500px] sticky top-5 left-0 bg-white rounded-md p-5 ">
                <div className="">
                    <div className="flex items-center justify-center  ">
                        <Image src={admin} alt="profile" width={50} height={50} className="border border-black rounded-full" />
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-lg font-semibold">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>
                </div>
                <hr className="my-3 " />
                <div>
                    <div className="flex flex-col mt-5 gap-6 ml-6">
                        <div>
                            <div className={navigation === "/admin" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                                <MdSpaceDashboard size={20} />
                                <Link href="/admin">Dashboard</Link>
                            </div>
                        </div>
                        <div>
                            <div className={navigation === "/admin/stack" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                                <BsFilePost size={20} />
                                <Link href="/admin/stack">Post</Link>
                            </div>
                        </div>

                        <div>
                            <div className={navigation === "/admin/doc" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                                <IoDocumentText size={20} />
                                <Link href="/admin/doc">Document</Link>
                            </div>
                        </div>

                        <div>
                            <div className={navigation === "/admin/user" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                                <FaUserCheck size={20} />
                                <Link href="/admin/user"> Users</Link>
                            </div>
                        </div>

                    </div>
                </div>
                <hr className="my-3 " />
                <div>
                    <div className="flex flex-col mt-5 gap-6 ml-6">
                        <div>
                            <div className="flex items-center  gap-3 font-semibold">
                                <IoIosSettings size={20} />
                                <div className="cursor-pointer">Settings</div>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => signOut()} className="flex items-center  gap-3 font-semibold">
                                <FaSignOutAlt size={20} />
                                <div className="cursor-pointer" >Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden w-12  max-h-[500px] sticky top-5 left-0 bg-white rounded-md p-1 ">
                <div className="">
                    <div className="flex items-center justify-center  ">
                        <Image src={admin} alt="profile" width={30} height={30} className="border border-black rounded-full" />
                    </div>

                </div>
                <hr className="my-3" />
                <div>
                    <div className="flex flex-col items-center mt-5 gap-6">
                        <div>
                            <div className={navigation === "/admin" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                                <Link href="/admin"> <MdSpaceDashboard size={20} /></Link>

                            </div>
                        </div>
                        <div>
                          <div className={navigation === "/admin/stack" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                                <Link href="/admin/stack"><BsFilePost size={20} /></Link>
                            </div>
                        </div>

                        <div>
                          <div className={navigation === "/admin/doc" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                                <Link href="/admin/doc"><IoDocumentText size={20} /></Link>
                            </div>
                        </div>

                        <div>
                          <div className={navigation === "/admin/user" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                                <Link href="/admin/user"><FaUserCheck size={20} /></Link>
                            </div>
                        </div>

                    </div>
                </div>
                <hr className="my-3 " />
                <div>
                    <div className="flex flex-col mt-5 gap-6 items-center">
                        <div>
                            <div className="flex items-center  gap-3 font-semibold">
                                <IoIosSettings size={20} />
                            </div>
                        </div>
                        <div>
                            <div onClick={() => signOut()} className="flex items-center  gap-3 font-semibold">
                                <FaSignOutAlt size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default AdminSideBar